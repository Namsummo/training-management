import { ApiResponse } from "@/shared/lib/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  name: string;
  email: string;

  birthday: string | null;
  gender: string | null;
  position_relevance: string | null;
  fitness_status: string | null;

  height: number | null;
  weight: number | null;

  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}
export interface LoginData {
  token: string;
  user: LoginUser;
}
export type LoginResponse = ApiResponse<LoginData>;
