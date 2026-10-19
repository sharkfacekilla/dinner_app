import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { LoginForm } from "./loginform";

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/");
  return <LoginForm />;
}
