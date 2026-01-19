import { ApiResponse } from "@/shared/lib/api";
import { AthleteStatus } from "./addAthlete.type";

export interface UpdateAthleteRequest {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  birthday?: string | null;
  gender?: string | null;
  height?: number | null;
  weight?: number | null;
  position_relevance?: string | null;
  fitness_status?: AthleteStatus | null;
  avatar?: File | null;
  athlete_status?: AthleteStatus | null;
  jersey_number?: number | null;
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

export type UpdateAthleteResponse = ApiResponse<AthleteResponse>;
