"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Dumbbell,
  Calendar,
  HouseHeart,
  NotebookTextIcon,
  UsersRoundIcon,
  Globe,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clearAuth } from "@/shared/lib/auth";

export type MenuItem = {
  title: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: {
    title: string;
    url: string;
  }[];
};


type AppSidebarProps = {
  title: string | React.ReactNode;
  items: MenuItem[];
  children: React.ReactNode;
};

export function AppSidebar({ title, items, children }: AppSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const router = useRouter();

  const toggleExpanded = (title: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedItems(newExpanded);
  };

  const isParentActive = (item: MenuItem) => {
    if (!item.children) {
      return !!item.url && pathname.startsWith(item.url);
    }
    // If the parent has its own url that matches the current path, treat it as active
    if (item.url && pathname.startsWith(item.url)) return true;
    // Treat a parent active when any of its children match the current path (prefix match)
    return item.children.some((child) => pathname.startsWith(child.url));
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            {typeof title === "string" ? (
              <h2 className="text-lg font-semibold">{title}</h2>
            ) : (
              title
            )}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
               {items.map((item) => {
                 const Icon = item.icon;
                 const isActive = isParentActive(item);
                 // auto-expand when the item is active or when user explicitly expanded it
                 const isExpanded = expandedItems.has(item.title) || isActive;
  
  if (!item.children) {
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          asChild
          isActive={isActive}
          tooltip={item.title}
          className="h-10 px-3 ml-2  data-[active=true]:bg-[#5954E6] data-[active=true]:text-white"
        >
          <Link href={item.url!} className="flex items-center gap-2">
            <Icon className="size-5 shrink-0" />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem key={item.title}>
      {/* Parent */}
      <SidebarMenuButton
        onClick={() => toggleExpanded(item.title)}
        isActive={isActive}
        className="h-10 px-3 ml-2 data-[active=true]:bg-[#5954E6] data-[active=true]:text-white data-[active=true]:font-semibold"
      >
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center gap-2">
            <Icon className="size-5 shrink-0" />
            <span>{item.title}</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </div>
      </SidebarMenuButton>

      {/* Children */}
      {isExpanded && (
        <div className="ml-8 mt-1 space-y-1">
          {item.children.map((child) => {
            const isChildActive = pathname === child.url;

            return (
              <SidebarMenuButton
                key={child.url}
                asChild
                isActive={isChildActive}
                className="
                  h-9  px-3 text-sm
                  data-[active=true]:bg-[#F7F8FB]
                  data-[active=true]:font-semibold
                  data-[active=true]:text-black
                "
              >
                <Link href={child.url}>{child.title}</Link>
              </SidebarMenuButton>
            );
          })}
        </div>
      )}
    </SidebarMenuItem>
  );
})}
                </SidebarMenu>
              <div className="border-t border-dashed mt-2" />
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="Settings"
                  className="w-[216px] h-[40px] hover:bg-muted ml-2"
                >
                  <Link
                    href="/coach/coach-settings"
                    className="flex items-center gap-2"
                  >
                    <Settings className="size-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Logout"
                  className=" w-[216px] h-[40px] ml-2 "
                  onClick={() => {
                    try {
                      // remove token and user from localStorage
                      clearAuth();
                    } catch (e) {
                      // ignore
                    }
                    // redirect to signin and replace history so back doesn't return to protected pages
                    router.replace("/signin");
                  }}
                >
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2 pb-2">
            <div className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition">
              {/* Avatar */}
              <div className="h-9 w-9 rounded-full overflow-hidden bg-muted">
                <Image
                  src="/images/bot.png" 
                  alt="Current user"
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>

              {/* User info */}
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">Coach Marcus</span>
                <span className="text-xs text-muted-foreground">
                  Head Coach
                </span>
              </div>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">{children}</SidebarInset>
    </SidebarProvider>
  );
}

// Menu items cho Coach Portal
export const coachMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/coach/dashboard",
    icon: HouseHeart,
  },
  {
    title: "Schedule",
    url: "/coach/schedule",
    icon: Calendar,
  },
 {
  title: "Exercises",
  url: "/coach/exercises/list", 
  icon: NotebookTextIcon,
  children: [
    {
      title: "Exercise List",
      url: "/coach/exercises/list",
    },
    {
      title: "Lesson Plan",
      url: "/coach/exercises/lesson-plan/list",
    },
  ],
},

  {
    title: "Athlete List",
    url: "/coach/athletes",
    icon: UsersRoundIcon,
  },
  
  {
    title: "AI Analytics",
    url: "/coach/ai",
    icon: Globe,
    children: [
      {
        title: "Performance",
        url: "/coach/ai/performance",
      },
      {
        title: "Injury Risks",
        url: "/coach/ai/injury-risks",
      },
    ],
  },
  {
    title: "Chat& FeedBacks",
    url: "/coach/chat-feetback",
    icon: MessageSquare,
  },
];

// Menu items cho Athlete Portal
export const athleteMenuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/athlete/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Workouts",
    url: "/athlete/workouts",
    icon: Dumbbell,
  },
];
