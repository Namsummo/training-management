"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getApiUser, getApiToken } from "@/shared/lib/auth";

type RequireAuthProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
};

export default function RequireAuth({
  children,
  redirectTo = "/login",
}: RequireAuthProps) {
  const router = useRouter();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    // Avoid running effect multiple times
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    const user = getApiUser();
    const token = getApiToken();

    if (!user || !token) {
      // replace so user can't go back to protected page
      router.replace(redirectTo);
      return;
    }
  }, [router, redirectTo]);

  return <>{children}</>;
}
