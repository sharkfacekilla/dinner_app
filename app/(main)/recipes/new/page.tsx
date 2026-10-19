import { CreateRecipeForm } from "@/app/components/createrecipeform";
import { requireUser } from "@/lib/auth/session";

export default async function Page() {
  await requireUser();
  return <CreateRecipeForm />;
}
