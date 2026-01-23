"use client";

import {
  AppSidebar,
  coachMenuItems,
  athleteMenuItems,
} from "@/shared/components/ui/sidebar/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { ChevronsLeft, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import RequireAuth from "@/shared/components/auth/RequireAuth";
import RoleBasedProtection from "@/shared/components/auth/RoleBasedProtection";
import { getApiUser } from "@/shared/lib/auth";
import { useMemo } from "react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user role once and memoize
  const user = getApiUser();
  const userRole = useMemo(() => user?.role?.[0] || null, [user]);

  // Determine menu items based on actual user role, not pathname
  const items = userRole === "Coach" ? coachMenuItems : athleteMenuItems;

  const areaLabel = userRole === "Coach" ? "Coach area" : "Athlete area";
  const areaColor = userRole === "Coach" ? "text-slate-500" : "text-indigo-500";

  if (userRole === "Coach") {
    return (
      <AppSidebar
        items={items}
        title={
          <div className="flex flex-col w-full gap-4">
            {/* Logo + Collapse */}
            <div className="flex items-center justify-between">
              <Image
                src="/images/veloxity.png"
                alt="Veloxity logo"
                width={96}
                height={24}
                priority
              />
              <Button
                variant="ghost"
                size="icon"
                className="size-7 text-muted-foreground"
              >
                <ChevronsLeft size={18} />
              </Button>
            </div>

            {/* Workspace */}
            <div className="mt-2 flex items-center justify-between rounded-lg border px-3 py-2 hover:bg-muted transition cursor-pointer w-[216px] h-[48px]">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/bot.png"
                  alt="Workspace avatar"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <div className="leading-tight">
                  <p className="text-xs text-muted-foreground">Workspace</p>
                  <p className="text-sm font-medium">V-League</p>
                </div>
              </div>
              <ChevronsUpDown size={16} className="text-muted-foreground" />
            </div>

            {/* Divider */}
            <div className="border-t border-dashed" />
          </div>
        }
      >
        {/* Top bar */}
        <header
          className="flex h-16 items-center gap-2 border-b px-4"
          style={{ paddingLeft: 250 }}
        >
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <p className={`text-xs font-semibold uppercase ${areaColor}`}>
              {areaLabel}
            </p>
          </div>
        </header>

        {/* Content */}
        <main
          className="flex-1 space-y-6 p-6 bg-muted/40"
          style={{ paddingLeft: 270, marginLeft: 20 }}
        >
          <RequireAuth>
            <RoleBasedProtection>{children}</RoleBasedProtection>
          </RequireAuth>
        </main>
      </AppSidebar>
    );
  } else {
    return (
      <main className="flex-1 space-y-6 p-6 bg-muted/40">
        <RequireAuth>
          <RoleBasedProtection>{children}</RoleBasedProtection>
        </RequireAuth>
      </main>
    );
  }
}
