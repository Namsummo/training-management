import { useMemo } from "react";

type Role = "coach" | "athlete" | null;

export function useRole(role: Role) {
  // Placeholder logic: future implementation can fetch from auth/session
  return useMemo(() => ({ role, isCoach: role === "coach", isAthlete: role === "athlete" }), [role]);
}

