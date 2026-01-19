// src/shared/service/api/login.api.ts

import { api } from "@/shared/lib/axios";
import { LoginRequest, LoginResponse } from "../types/login.type";

export const loginService = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    "/login",
    payload
  );
  return data;
};
