import { useMutation, useQueryClient } from "@tanstack/react-query";
import { planService } from "../../api/listTrainingPlans.service";

export const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; message: string },
    Error,
    number
  >({
    mutationFn: (planId) => {
      const res = planService.deletePlan(planId);
      return res.then((response) => response.data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["training-plans"],
      });
    },
  });
};
