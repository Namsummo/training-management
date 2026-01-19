// src/shared/service/hooks/mutations/login.mutation.ts

import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../../types/login.type";
import { loginService } from "../../api/login.service";

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginService,
  });
