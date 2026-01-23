export type AthleteStatus =
  | "available"
  | "limited"
  | "unavailable"
  | "no_response";

export type ActiveStatus = "active" | "inactive";

export interface Athlete {
  id: number;
  name: string;
  role: string;
  unit: string;
  status: AthleteStatus; // available | limited | ...
  statusActive: ActiveStatus; // active | inactive
  note: string;
}

export const ATHLETES: Athlete[] = [
  {
    id: 1,
    name: "Leon",
    role: "Forward",
    unit: "Attack",
    status: "available",
    statusActive: "active",
    note: "Full participation. Sleep score 88/100.",
  },
  {
    id: 2,
    name: "Luke Shaw",
    role: "Defender",
    unit: "Defense",
    status: "limited",
    statusActive: "inactive",
    note: "Calf Strain. Rehab Pitch 3 only. No contact.",
  },
  {
    id: 3,
    name: "Bruno Fernandes",
    role: "Midfielder",
    unit: "Midfield",
    status: "no_response",
    statusActive: "inactive",
    note: "Last active: 4h ago",
  },
  {
    id: 4,
    name: "Mason Mount",
    role: "Midfielder",
    unit: "Midfield",
    status: "unavailable",
    statusActive: "inactive",
    note: "Medical Leave (Surgery). Out until next month.",
  },
];

export type MetricKey =
  | "attendance"
  | "avg_rpe"
  | "avg_pain"
  | "load_vs_planned";

export interface MetricStat {
  key: MetricKey;
  title: string;
  value: string;
  change: number;
}
export const METRIC_STATS: MetricStat[] = [
  {
    key: "attendance",
    title: "Attendance",
    value: "24/26",
    change: -2,
  },
  {
    key: "avg_rpe",
    title: "Avg Team RPE",
    value: "7.2/10",
    change: 15,
  },
  {
    key: "avg_pain",
    title: "Avg Pain Score",
    value: "2.1/10",
    change: -5,
  },
  {
    key: "load_vs_planned",
    title: "Load vs Planned",
    value: "104%",
    change: 4,
  },
];

// flagged-athletes.data.ts
export type FlagStatus = "high_strain" | "exertion_warning" | "threshold_break";

export interface FlaggedAthlete {
  id: string;
  name: string;
  role: string;
  rpe: number;
  pain: number;
  area: string;
  status: FlagStatus;
}

export const FLAGGED_ATHLETES: FlaggedAthlete[] = [
  {
    id: "73",
    name: "Leon",
    role: "Midfield",
    rpe: 8,
    pain: 6,
    area: "Left Hamstring",
    status: "high_strain",
  },
  {
    id: "73",
    name: "David Miller",
    role: "Forward",
    rpe: 1,
    pain: 2,
    area: "Right Ankle",
    status: "exertion_warning",
  },
  {
    id: "73",
    name: "Leo Garcia",
    role: "Defender",
    rpe: 1,
    pain: 2,
    area: "General Fatigue",
    status: "threshold_break",
  },
];
// session-meta.ts
export interface SessionMeta {
  code: string;
  duration: string;
  status: "completed" | "pending";
}

export const SESSION_META: SessionMeta = {
  code: "HIT-2024-05",
  duration: "90 mins",
  status: "completed",
};
