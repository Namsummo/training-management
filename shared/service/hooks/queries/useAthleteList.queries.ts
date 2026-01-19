'use client'

import { useQuery } from "@tanstack/react-query";
import { UsersListResponse } from "../../types/athlete.type";
import { getUsers } from "../../api/athlete.service";

export const useAthleteQuery = (page: number) => {
  return useQuery<UsersListResponse>({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
  });
};
