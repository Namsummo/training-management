import { useQuery } from "@tanstack/react-query";
import { planService } from "@/shared/service/api/listTrainingPlans.service";
import {
  ListTrainingPlansRequest,
  ListTrainingPlansResponse,
} from "@/shared/service/types/listTrainingPlans.type";

export const useGetListTrainingPlans = (params?: ListTrainingPlansRequest) => {
  return useQuery<ListTrainingPlansResponse>({
    queryKey: ["training-plans", params],
    queryFn: async () => {
      const res = await planService.getPlans(params);
      return res.data;
    },
    enabled: true,
  });
};
