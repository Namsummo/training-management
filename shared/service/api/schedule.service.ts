import { authFetch } from "@/shared/lib/api";

const DEFAULT_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://vitex.duckdns.org/api/v1").replace(/\/$/, "");

export interface ScheduleSection {
  title: string;
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM:SS or HH:MM
}

export interface SchedulePlan {
  plan_id: number;
  sections: ScheduleSection[];
}

export interface ScheduleResponse {
  success: boolean;
  message: string;
  data: SchedulePlan[];
}

export async function getSchedules(): Promise<ScheduleResponse> {
  return authFetch<ScheduleResponse>(`${DEFAULT_BASE}/schedules`);
}
