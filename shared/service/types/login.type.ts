import { ApiResponse } from "@/shared/lib/api";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface User {
  id: number;
  name: string;
  email: string;

  birthday: string | null;
  gender: string | null;
  position_relevance: string | null;
  fitness_status: string | null;

  height: number | null;
  weight: number | null;
  jersey_number: number | null;

  email_verified_at: string | null;
  avatar: string;
  created_at: string;
  updated_at: string;
  role: number;
}
export interface LoginData {
  token: string;
  user: User;
}
export type LoginResponse = ApiResponse<LoginData>;
