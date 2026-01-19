import { ApiResponse } from "@/shared/lib/api";

// src/types/auth.ts
export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  birthday: string | null;
  gender: boolean | null;
  height: number | null;
  weight: number | null;
  created_at: string;
  updated_at: string;
  devices: string[];
}

export type SignUpResponse= ApiResponse<UserData>;
