import AppSidebar from "@/app/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { requireUser } from "@/lib/auth/session";
import { getOtherUsers } from "@/lib/data/recipes";
import { OtherUsersProvider } from "@/app/components/otheruserscontext";

// Everything in (main) is behind the login. Pages and data functions check the session too,
// because a layout doesn't re-run on every client-side navigation.
export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, otherUsers] = await Promise.all([requireUser(), getOtherUsers()]);

  return (
    // TooltipProvider must sit above the sidebar
    <TooltipProvider>
      {/* SidebarProvider wraps both the sidebar AND the page content */}
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar username={user.username} />
          <main className="flex-1">
            <OtherUsersProvider users={otherUsers}>{children}</OtherUsersProvider>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
