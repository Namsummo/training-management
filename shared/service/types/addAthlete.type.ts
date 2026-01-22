import { ApiResponse } from "@/shared/lib/api";

export enum AthleteStatus {
  ACTIVE = "active",
  INJURED = "injured",
  INACTIVE = "inactive",
}
export enum FitnessStatus {
  AVAILABLE = "available",
  INJURED = "injured",
}

export interface CreateAthleteRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  birthday: string | null;
  gender?: string | null;
  height: number | null;
  weight: number | null;
  position_relevance: string | null;
  fitness_status: FitnessStatus | null;
  avatar?: File | null;
  athlete_status: AthleteStatus | null;
  jersey_number: number | null;
}

export interface AthleteResponse {
  id: number;
  name: string;
  email: string;
  avatar: string;
  birthday: string | null;
  gender: string | null;
  height: number | null;
  weight: number | null;
  position_relevance: string | null;
  fitness_status: string | null;
  created_at: string;
  updated_at: string;
  athlete_status: string | null;
  jersey_number: number | null;
}
export type CreateAthleteResponse = ApiResponse<AthleteResponse>;
