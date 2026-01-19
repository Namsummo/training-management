"use client";

import { usePathname } from "next/navigation";
import {
  AppSidebar,
  coachMenuItems,
  athleteMenuItems,
} from "@/shared/components/ui/sidebar/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { ChevronsLeft, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCoach = pathname?.startsWith("/coach");
  const isAthlete = pathname?.startsWith("/athlete");

  const items = isCoach ? coachMenuItems : isAthlete ? athleteMenuItems : [];

  const areaLabel = isCoach
    ? "Coach area"
    : isAthlete
    ? "Athlete area"
    : "Portal area";

  const areaColor = isCoach
    ? "text-slate-500"
    : isAthlete
    ? "text-indigo-500"
    : "text-slate-500";

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
      <header className="flex h-16 items-center gap-2 border-b px-4" style={{ paddingLeft: 250 }}>
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <p className={`text-xs font-semibold uppercase ${areaColor}`}>
            {areaLabel}
          </p>
        </div>
      </header>

      {/* Content */}

      <main className="flex-1 space-y-6 p-6 bg-muted/40" style={{ paddingLeft: 250 }}>{children}</main>
    </AppSidebar>
  );
}
