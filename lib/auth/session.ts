import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const SESSION_COOKIE = "session";
const SESSION_DAYS = 14;

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

export type SessionUser = { id: string; username: string };

export async function createSession(userId: string) {
  // 32 random bytes; the database only ever sees the hash, so a DB leak can't be replayed as cookies
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({ data: { id: hashToken(token), userId, expiresAt } });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true, // not readable by JavaScript
    secure: true, // HTTPS only (browsers allow this on http://localhost for development)
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { id: hashToken(token) } });
  cookieStore.delete(SESSION_COOKIE);
}

// The real auth check: looks the session up in the database on every request.
// Memoized per request with React cache, so calling it several times costs one query.
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { id: hashToken(token) },
    select: { expiresAt: true, user: { select: { id: true, username: true } } },
  });
  if (!session || session.expiresAt < new Date()) return null;

  return session.user;
});

// Call at the top of every page, data function and server action that touches user data
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
