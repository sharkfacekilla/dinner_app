// Account management. This is the ONLY way to create accounts or set passwords:
// the website has no sign-up or reset page, so nobody can make an account through it.
//
//   npm run user -- add <username>      create an account (asks for a password)
//   npm run user -- passwd <username>   set a new password and log that account out everywhere
//   npm run user -- list                show accounts
//   npm run user -- remove <username>   delete an account and everything it owns
import "dotenv/config";
import { createInterface } from "node:readline";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { hashPassword, MIN_PASSWORD_LENGTH } from "../lib/auth/password";
import { usernameSchema } from "../lib/validations/recipe";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

// Reads all stdin lines up front when piped (e.g. tests), or prompts with hidden input on a terminal
const piped: Promise<string[]> | null = process.stdin.isTTY
  ? null
  : new Promise((resolve) => {
      const lines: string[] = [];
      createInterface({ input: process.stdin })
        .on("line", (l) => lines.push(l))
        .on("close", () => resolve(lines));
    });

async function askHidden(question: string): Promise<string> {
  if (piped) {
    process.stdout.write(question + "\n");
    return (await piped).shift() ?? "";
  }
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    // Don't echo what's typed
    (rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = (s) => {
      if (s.startsWith(question)) process.stdout.write(question);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

async function askNewPassword(): Promise<string> {
  const pw = await askHidden(`New password (at least ${MIN_PASSWORD_LENGTH} characters): `);
  if (pw.length < MIN_PASSWORD_LENGTH) throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  if (pw.length > 200) throw new Error("Password must be at most 200 characters");
  const again = await askHidden("Repeat password: ");
  if (pw !== again) throw new Error("Passwords don't match");
  return pw;
}

function parseUsername(raw: string | undefined): string {
  const parsed = usernameSchema.safeParse(raw ?? "");
  if (!parsed.success) throw new Error("Username must be 1-50 characters: a-z, 0-9, _ or -");
  return parsed.data;
}

async function main() {
  const [command, rawName] = process.argv.slice(2);

  switch (command) {
    case "add": {
      const username = parseUsername(rawName);
      if (await prisma.user.findUnique({ where: { username } })) throw new Error(`User "${username}" already exists`);
      const passwordHash = await hashPassword(await askNewPassword());
      await prisma.user.create({ data: { username, passwordHash } });
      console.log(`Created user "${username}"`);
      break;
    }
    case "passwd": {
      const username = parseUsername(rawName);
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) throw new Error(`No user "${username}"`);
      const passwordHash = await hashPassword(await askNewPassword());
      await prisma.$transaction([
        prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
        prisma.session.deleteMany({ where: { userId: user.id } }),
      ]);
      console.log(`Password changed for "${username}"; all their sessions were logged out`);
      break;
    }
    case "list": {
      const users = await prisma.user.findMany({
        select: { username: true, createdAt: true, _count: { select: { recipes: true, sessions: true } } },
        orderBy: { createdAt: "asc" },
      });
      if (!users.length) console.log("No users yet. Create one with: npm run user -- add <username>");
      for (const u of users) {
        console.log(`${u.username}  (${u._count.recipes} recipes, ${u._count.sessions} sessions, created ${u.createdAt.toISOString().slice(0, 10)})`);
      }
      break;
    }
    case "remove": {
      const username = parseUsername(rawName);
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) throw new Error(`No user "${username}"`);
      const confirm = await askHidden(`Type "${username}" to delete this account and all its recipes: `);
      if (confirm !== username) throw new Error("Not confirmed, nothing deleted");
      await prisma.user.delete({ where: { id: user.id } });
      console.log(`Deleted user "${username}"`);
      break;
    }
    default:
      console.log("Usage: npm run user -- <add|passwd|remove> <username>\n       npm run user -- list");
      process.exitCode = 1;
  }
}

main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
