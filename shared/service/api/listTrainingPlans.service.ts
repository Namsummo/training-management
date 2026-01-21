import { api } from "@/shared/lib/axios";
import {
  ListTrainingPlansRequest,
  ListTrainingPlansResponse,
} from "../types/listTrainingPlans.type";

export const planService = {
  getPlans: (params?: ListTrainingPlansRequest) =>
    api.get<ListTrainingPlansResponse>("/plans", { params }),
};
