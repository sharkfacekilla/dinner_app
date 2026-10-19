import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface RecipesHeaderProps {
  count: number;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode; // e.g. the random recipe button, shown on the right
}

export function RecipesHeader({
  count,
  title = "All Recipes",
  subtitle = "recipes found",
  action,
}: RecipesHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:gap-4 sm:px-6">
      <SidebarTrigger className="-ml-2" />
      <Separator orientation="vertical" className="h-6" />
      <div className="flex flex-1 items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">
            {count} {subtitle}
          </p>
        </div>
        {action}
      </div>
    </header>
  );
}
