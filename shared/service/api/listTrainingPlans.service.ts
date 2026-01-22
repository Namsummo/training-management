import { api } from "@/shared/lib/axios";
import {
  ListTrainingPlansRequest,
  ListTrainingPlansResponse,
  UpdatePlanRequest,
  UpdatePlanResponse,
} from "../types/listTrainingPlans.type";

export const planService = {
  getPlans: (params?: ListTrainingPlansRequest) =>
    api.get<ListTrainingPlansResponse>("/plans", { params }),
  deletePlan: (planId: number) =>
    api.delete<{ success: boolean; message: string }>(`/plans/${planId}`),
  updatePlan: (planId: number, payload: UpdatePlanRequest) =>
    api.put<UpdatePlanResponse>(`/plans/${planId}`, payload),
  getPlanDetail: (planId: number) =>
    api.get<UpdatePlanResponse>(`/plans/${planId}`),
};
