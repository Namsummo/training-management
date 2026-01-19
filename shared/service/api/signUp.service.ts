import { api } from "@/shared/lib/axios";
import { SignUpRequest, SignUpResponse } from "../types/signUp.type";

export const signUp = async (
  payload: SignUpRequest
): Promise<SignUpResponse> => {
  const { data } = await api.post<SignUpResponse>(
    "/register",
    payload
  );
  return data;
};
