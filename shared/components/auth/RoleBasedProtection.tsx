"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getApiUser, getApiToken } from "@/shared/lib/auth";

type RoleBasedProtectionProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function RoleBasedProtection({
  children,
}: RoleBasedProtectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    // Avoid running effect multiple times
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    const user = getApiUser();
    const token = getApiToken();

    if (!user || !token) {
      router.replace("/login");
      return;
    }

    const userRole = user?.role?.[0];
    const isCoachPath = pathname?.startsWith("/coach");
    const isAthletePath = pathname?.startsWith("/athlete");

    // If trying to access coach path but not a coach, redirect to athlete
    if (isCoachPath && userRole !== "Coach") {
      router.replace("/athlete/dashboard");
      return;
    }

    // If coach accessing any path, allow
    if (userRole === "Coach") {
      return;
    }

    // If trying to access athlete path, allow
    if (isAthletePath) {
      return;
    }
  }, [router, pathname]);

  return <>{children}</>;
}
