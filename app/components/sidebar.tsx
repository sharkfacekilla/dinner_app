"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Home,
  BookOpen,
  Heart,
  FolderOpen,
  PlusCircle,
  Settings,
  LogIn,
  ChefHat,
  Search,
  Tag,
  Sun,
  Moon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

const mainNavItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "All Recipes", icon: BookOpen, url: "/recipes" },
  { title: "Favorites", icon: Heart, url: "/favorites" },
  { title: "Categories", icon: FolderOpen, url: "/categories" },
  { title: "Tags", icon: Tag, url: "/tags" },
];

const actionItems = [
  { title: "Add Recipe", icon: PlusCircle, url: "/recipes/new" },
  { title: "Import Recipe", icon: BookOpen, url: "/recipes/import" },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  // Only show theme-specific text after mounting (avoids hydration mismatch)
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* The key is 'group-data-[collapsible=icon]:justify-center'
                and 'group-data-[collapsible=icon]:px-0' */}
            <SidebarMenuButton
              size="lg"
              asChild
              className="group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
            >
              <a href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ChefHat className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
                  <span className="font-semibold text-sidebar-foreground">
                    Recipe Vault
                  </span>
                  <span className="text-xs text-sidebar-foreground/60">
                    Homelab Edition
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <div className="relative px-2">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-foreground/50" />
            <Input
              placeholder="Search recipes..."
              className="h-9 w-full border-sidebar-border bg-sidebar-accent/50 pl-9 text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus-visible:ring-sidebar-ring"
            />
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {actionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              tooltip="Toggle Theme"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-4 w-4 items-center justify-center">
                  {/* MOON: Visible in light mode, hidden in dark mode */}
                  <Moon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  {/* SUN: Hidden in light mode, shown in dark mode */}
                  <Sun className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
                <span className="capitalize">
                  {!mounted
                    ? "Theme"
                    : `${theme === "dark" ? "Light" : "Dark"} Mode`}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              isActive={pathname === "/settings"}
            >
              <a href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Login"
              isActive={pathname === "/login"}
            >
              <a href="/login">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
