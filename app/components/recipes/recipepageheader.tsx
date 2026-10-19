import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface RecipesHeaderProps {
  count: number;
  title?: string;
  subtitle?: string;
}

export function RecipesHeader({
  count,
  title = "All Recipes",
  subtitle = "recipes found",
}: RecipesHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur">
      <SidebarTrigger className="-ml-2" />
      <Separator orientation="vertical" className="h-6" />
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">
          {count} {subtitle}
        </p>
      </div>
    </header>
  );
}
