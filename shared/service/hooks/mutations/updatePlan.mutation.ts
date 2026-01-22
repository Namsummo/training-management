import { useMutation, useQueryClient } from "@tanstack/react-query";
import { planService } from "../../api/listTrainingPlans.service";
import {
  UpdatePlanRequest,
  UpdatePlanResponse,
} from "../../types/listTrainingPlans.type";

export const useUpdatePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdatePlanResponse,
    Error,
    { planId: number; payload: UpdatePlanRequest }
  >({
    mutationFn: ({ planId, payload }) => {
      const res = planService.updatePlan(planId, payload);
      return res.then((response) => response.data);
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["training-plans"],
      });
      // Also invalidate the specific plan detail query
      queryClient.invalidateQueries({
        queryKey: ["plan", variables.planId],
      });
    },
  });
};
