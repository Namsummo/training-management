import { useQuery } from "@tanstack/react-query";
import { planService } from "@/shared/service/api/listTrainingPlans.service";
import { UpdatePlanResponse } from "@/shared/service/types/listTrainingPlans.type";

export const useGetPlanDetail = (planId: number) => {
  return useQuery<UpdatePlanResponse>({
    queryKey: ["plan", planId],
    queryFn: async () => {
      const res = await planService.getPlanDetail(planId);
      return res.data;
    },
    enabled: !!planId,
  });
};
