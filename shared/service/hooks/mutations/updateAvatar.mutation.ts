import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAvatarService } from "../../api/athlete.service";
import { UpdateAthleteResponse } from "../../types/updateAthlete.type";

export const useUpdateAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateAthleteResponse, Error, { userId: string; avatarFile: File }>({
    mutationFn: ({ userId, avatarFile }) => updateAvatarService(userId, avatarFile),

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
