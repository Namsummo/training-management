import { AthleteStatus } from "@/shared/service/types/addAthlete.type";
import z from "zod";

// Schema for updating athlete - password is optional
export const updateAthleteSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().optional().or(z.literal("")),
    password_confirmation: z.string().optional().or(z.literal("")),
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
    athlete_status: z
      .enum([
        AthleteStatus.ACTIVE,
        AthleteStatus.INJURED,
        AthleteStatus.INACTIVE,
      ])
      .nullable(),
    jersey_number: z.number().min(0, "").nullable(),
    avatar: (typeof File !== "undefined" ? z.instanceof(File) : z.any())
      .nullable()
      .optional(),
  })
  .refine(
    (data) => {
      // Only validate password match if password is provided
      if (data.password && data.password.trim().length > 0) {
        return data.password === data.password_confirmation;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["password_confirmation"],
    },
  );

export type UpdateAthleteFormValues = z.infer<typeof updateAthleteSchema>;
