import { ApiResponse } from "@/shared/lib/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RolePivot {
  model_type: string;
  model_id: string;
  role_id: string;
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: RolePivot;
}

export interface User {
  id: number;
  name: string;
  email: string;
  birthday: string | null;
  gender: string | null;
  position_relevance: string | null;
  fitness_status: string | null;
  athlete_status: string | null;
  height: number | null;
  weight: number | null;
  jersey_number: number | null;
  email_verified_at: string | null;
  avatar: string | null;
  created_at: string;
  updated_at: string;
  roles: Role[];
}

export interface LoginData {
  token: string;
  user: User;
  role: string[];
}

export type LoginResponse = ApiResponse<LoginData>;
