// shared/service/api/users.api.ts
import { api } from "@/shared/lib/axios";
import { UsersListResponse } from "../types/athlete.type";
import {
  CreateAthleteRequest,
  CreateAthleteResponse,
} from "../types/addAthlete.type";
import {
  UpdateAthleteRequest,
  UpdateAthleteResponse,
} from "../types/updateAthlete.type";
import { User } from "../types/login.type";
import { ApiResponse } from "@/shared/lib/api";

export const getUsers = async (
  page: number = 1,
  perPage: number = 5,
): Promise<UsersListResponse> => {
  const { data } = await api.get<UsersListResponse>("/users", {
    params: { page, per_page: perPage },
  });

  return data;
};

export const createAthleteService = async (
  payload: CreateAthleteRequest,
): Promise<CreateAthleteResponse> => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  if (payload.password) {
    formData.append("password", payload.password);
  }
  if (payload.password_confirmation) {
    formData.append("password_confirmation", payload.password_confirmation);
  }
  if (payload.birthday) {
    formData.append("birthday", payload.birthday);
  }
  if (payload.gender) {
    formData.append("gender", payload.gender);
  }
  if (payload.height !== null) {
    formData.append("height", String(payload.height));
  }
  if (payload.weight !== null) {
    formData.append("weight", String(payload.weight));
  }
  if (payload.position_relevance) {
    formData.append("position_relevance", payload.position_relevance);
  }
  if (payload.fitness_status !== null && payload.fitness_status !== undefined) {
    formData.append("fitness_status", payload.fitness_status);
  }
  if (payload.athlete_status !== null && payload.athlete_status !== undefined) {
    formData.append("athlete_status", payload.athlete_status);
  }
  if (payload.jersey_number !== null && payload.jersey_number !== undefined) {
    formData.append("jersey_number", String(payload.jersey_number));
  }
  // Handle avatar file - only append if it's a File instance
  if (payload.avatar instanceof File) {
    // Verify it's an image file before appending
    if (!payload.avatar.type || !payload.avatar.type.startsWith("image/")) {
      throw new Error("Avatar must be an image file");
    }
    formData.append("avatar", payload.avatar);
  }
  const { data } = await api.post<CreateAthleteResponse>("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getAthleteDetail = async (
  id: string,
): Promise<ApiResponse<User>> => {
  const { data } = await api.get<ApiResponse<User>>(`/users/${id}`);
  return data;
};

export const updateAthleteService = async (
  userId: string,
  payload: UpdateAthleteRequest,
): Promise<UpdateAthleteResponse> => {
  const formData = new FormData();

  if (payload.name) {
    formData.append("name", payload.name);
  }
  if (payload.email) {
    formData.append("email", payload.email);
  }
  if (payload.password) {
    formData.append("password", payload.password);
  }
  if (payload.password_confirmation) {
    formData.append("password_confirmation", payload.password_confirmation);
  }
  if (payload.birthday !== undefined) {
    formData.append("birthday", payload.birthday || "");
  }
  if (payload.gender !== undefined) {
    formData.append("gender", payload.gender || "");
  }
  if (payload.height !== null && payload.height !== undefined) {
    formData.append("height", String(payload.height));
  }
  if (payload.weight !== null && payload.weight !== undefined) {
    formData.append("weight", String(payload.weight));
  }
  if (payload.position_relevance !== undefined) {
    formData.append("position_relevance", payload.position_relevance || "");
  }
  if (payload.fitness_status !== null && payload.fitness_status !== undefined) {
    formData.append("fitness_status", payload.fitness_status);
  }
  if (payload.athlete_status !== null && payload.athlete_status !== undefined) {
    formData.append("athlete_status", payload.athlete_status);
  }
  if (payload.jersey_number !== null && payload.jersey_number !== undefined) {
    formData.append("jersey_number", String(payload.jersey_number));
  }
  const { data } = await api.put<UpdateAthleteResponse>(
    `/users/${userId}`,
    formData,
  );
  return data;
};

export const updateAvatarService = async (
  userId: string,
  avatarFile: File,
): Promise<UpdateAthleteResponse> => {
  const formData = new FormData();

  // Verify it's an image file before appending
  if (!avatarFile.type || !avatarFile.type.startsWith("image/")) {
    throw new Error("Avatar must be an image file");
  }

  formData.append("avatar", avatarFile);

  const { data } = await api.post<UpdateAthleteResponse>(
    `/users/${userId}/update-avatar`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};
