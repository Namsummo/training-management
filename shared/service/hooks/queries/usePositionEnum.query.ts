import { api } from "@/shared/lib/axios";
import { useQuery } from "@tanstack/react-query";

export interface PositionEnum {
  key: string;
  label: string;
}

export const usePositionEnumQuery = () => {
  return useQuery({
    queryKey: ["position-enum"],
    queryFn: async () => {
      const res = await api.get("/enums/PositionRelevanceEnum");
      return res.data.data as PositionEnum[];
    },
  });
};
