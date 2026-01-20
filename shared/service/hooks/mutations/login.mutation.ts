// src/shared/service/hooks/mutations/login.mutation.ts

import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../../types/login.type";
import { loginService } from "../../api/login.service";

export const useLogin = () =>
  useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginService,
    onSuccess: (data) => {
      // Store token and user data in localStorage
      if (typeof window !== "undefined" && data.data) {
        localStorage.setItem("api_token", data.data.token);

        // Ensure role is included in user data
        const userData = {
          ...data.data.user,
          role:
            data.data.role || data.data.user?.roles?.map((r) => r.name) || [],
        };

        localStorage.setItem("api_user", JSON.stringify(userData));
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
