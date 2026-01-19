// src/shared/hooks/mutations/useSignUp.ts
import { useMutation } from "@tanstack/react-query";
import { SignUpRequest, SignUpResponse } from "../../types/signUp.type";
import { signUp } from "../../api/signUp.service";


export const useSignUp = () =>
  useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: signUp,
  });
