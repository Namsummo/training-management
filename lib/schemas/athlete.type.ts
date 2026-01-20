import { AthleteStatus } from "@/shared/service/types/addAthlete.type";
import z from "zod";

export const athleteSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(8, "Confirm password is required"),
    birthday: z.string().nullable(),
    height: z
      .number()
      .min(50, "Height too small")
      .max(300, "Height too large")
      .nullable(),
    weight: z
      .number()
      .min(20, "Weight too small")
      .max(300, "Weight too large")
      .nullable(),
    position_relevance: z.string().nullable(),
    fitness_status: z
      .enum([AthleteStatus.AVAILABLE, AthleteStatus.INJURED])
      .nullable(),
    jersey_number: z.number().min(0, ""),
    avatar: z.instanceof(File).nullable().optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
