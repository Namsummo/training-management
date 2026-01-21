import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAthleteService } from "../../api/athlete.service";
import {
  UpdateAthleteRequest,
  UpdateAthleteResponse,
} from "../../types/updateAthlete.type";

export const useUpdateAthleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateAthleteResponse, Error, { userId: string; payload: UpdateAthleteRequest }>({
    mutationFn: ({ userId, payload }) => updateAthleteService(userId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["athletes"],
      });
      // Also invalidate the specific athlete detail query
      queryClient.invalidateQueries({
        queryKey: ["athlete", variables.userId],
      });
    },
  });
};
