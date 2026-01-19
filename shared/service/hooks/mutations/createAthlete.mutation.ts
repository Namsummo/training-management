import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAthleteService } from "../../api/athlete.service";
import {
  CreateAthleteRequest,
  CreateAthleteResponse,
} from "../../types/addAthlete.type";

export const useCreateAthleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateAthleteResponse, Error, CreateAthleteRequest>({
    mutationFn: createAthleteService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["athletes"],
      });
    },
  });
};
