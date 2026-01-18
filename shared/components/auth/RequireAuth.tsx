"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiUser, getApiToken } from "@/shared/lib/auth";

type RequireAuthProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
};

export default function RequireAuth({
  children,
  fallback = null,
  redirectTo = "/signin",
}: RequireAuthProps) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    // perform a quick local check and redirect if missing
    const user = getApiUser();
    const token = getApiToken();
    if (!user || !token) {
      // replace so user can't go back to protected page
      router.replace(redirectTo);
      return;
    }
    setOk(true);
  }, [router, redirectTo]);

  if (!ok) return <>{fallback}</>;
  return <>{children}</>;
}
