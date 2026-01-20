import { useMemo } from "react";
import { getApiUser } from "@/shared/lib/auth";

type Role = "Coach" | "Athlete" | null;

export function useRole() {
  return useMemo(() => {
    const user = getApiUser();
    const role = user?.role?.[0] || null;
    return {
      role: role as Role,
      isCoach: role === "Coach",
      isAthlete: role === "Athlete",
    };
  }, []);
}


