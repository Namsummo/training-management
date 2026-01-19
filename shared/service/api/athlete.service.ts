// shared/service/api/users.api.ts
import { api } from "@/shared/lib/axios";
import { UsersListResponse } from "../types/athlete.type";

export const getUsers = async (
  page: number = 1,
  perPage: number = 5
): Promise<UsersListResponse> => {
  const { data } = await api.get<UsersListResponse>("/users", {
    params: { page, per_page: perPage },
  });

  return data;
};
