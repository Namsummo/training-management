import { ApiResponse } from "@/shared/lib/api";

export interface PlanUserPivot {
  plan_id: string;
  user_id: string;
}
export type PlanStatus = "draft" | "active" | "archived";
export type TargetOutcome = "conditioning" | "technical";
export interface User {
  id: number;
  name: string;
  email: string;
  birthday: string | null;
  gender: string | null;
  position_relevance: string | null;
  fitness_status: string | null;
  athlete_status: string | null;
  jersey_number: number | null;
  height: number | null;
  weight: number | null;
  email_verified_at: string | null;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}
export interface PlanUser extends User {
  pivot: PlanUserPivot;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  target_outcome: TargetOutcome[];
  status: PlanStatus;
  created_by: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;

  users: PlanUser[];
  creator: User;
}
export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}
export interface PaginatedData {
  current_page: number;
  data: Plan[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ListTrainingPlansRequest {
  start_date?: string;
  get_all: number;
  // page: number;
  per_page: number;
}

export type ListTrainingPlansResponse = ApiResponse<PaginatedData>;
