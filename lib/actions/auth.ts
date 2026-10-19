"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { burnPasswordCheck, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { clearLoginFailures, isLoginBlocked, recordLoginFailure } from "@/lib/auth/rate-limit";

export type LoginState = { error?: string } | undefined;

const loginSchema = z.object({
  username: z.string().trim().toLowerCase().min(1).max(50),
  // Upper bound so nobody can make the server hash a megabyte-long "password"
  password: z.string().min(1).max(200),
});

const INVALID = "Invalid username or password";

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: INVALID };
  const { username, password } = parsed.data;

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  const keys = [`user:${username}`, `ip:${ip}`];

  if (isLoginBlocked(keys)) {
    return { error: "Too many failed attempts. Try again in 15 minutes." };
  }

  const user = await prisma.user.findUnique({ where: { username } });
  const ok = user
    ? await verifyPassword(password, user.passwordHash)
    : (await burnPasswordCheck(password), false);

  if (!user || !ok) {
    recordLoginFailure(keys);
    return { error: INVALID };
  }

  clearLoginFailures(keys);
  await prisma.session.deleteMany({ where: { userId: user.id, expiresAt: { lt: new Date() } } });
  await createSession(user.id);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
