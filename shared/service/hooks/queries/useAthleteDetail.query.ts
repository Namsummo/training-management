'use client'

import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "@/shared/lib/api";
import { User } from "../../types/login.type";
import { getAthleteDetail } from "../../api/athlete.service";

export const useAthleteDetailQuery = (id: string) => {
  return useQuery<ApiResponse<User>>({
    queryKey: ["athlete", id],
    queryFn: () => getAthleteDetail(id),
    enabled: !!id,
  });
};
