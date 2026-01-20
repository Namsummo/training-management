"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { ArrowLeft } from "lucide-react";
import { useCreateAthleteMutation } from "@/shared/service/hooks/mutations/createAthlete.mutation";
import z from "zod";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { CreateAthleteRequest } from "@/shared/service/types/addAthlete.type";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePositionEnumQuery } from "@/shared/service/hooks/queries/usePositionEnum.query";
import { AthleteStatus } from "@/shared/service/types/addAthlete.type";
import { useQueryClient } from "@tanstack/react-query";
import { athleteSchema } from "@/lib/schemas/athlete.type";

type AthleteFormValues = z.infer<typeof athleteSchema>;
export default function AddAthletePage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const { data: positions = [], isLoading } = usePositionEnumQuery();
  const { mutate: athleteMutation } = useCreateAthleteMutation();
  const queryClient = useQueryClient();
  const form = useForm<AthleteFormValues>({
    resolver: zodResolver(athleteSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      birthday: null,
      height: null,
      weight: null,
      position_relevance: null,
      fitness_status: AthleteStatus.AVAILABLE,
      jersey_number: 0,
      avatar: null,
    },
  });

  function handleSave(values: AthleteFormValues) {
    const payload: CreateAthleteRequest = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
      position_relevance: values.position_relevance,
      height: values.height,
      weight: values.weight,
      birthday: values.birthday,
      avatar: values.avatar,
      fitness_status: values.fitness_status,
      athlete_status: values.fitness_status,
      jersey_number: values.jersey_number,
    };
    athleteMutation(payload, {
      onSuccess: (res) => {
        toast.success("Success", {
          description: res.message,
        });
        queryClient.invalidateQueries({ queryKey: ["athletes"] });
        form.reset();

        router.push("/coach/athletes");
      },
    });
  }
  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Add New Athlete</h1>
            <div className="text-sm text-slate-500 mt-1">
              Complete the profile to onboard a new player.
            </div>
          </div>
          <div>
            <Link href="/coach/athletes">
              <AppButton
                className="text-sm px-3 py-2 border rounded bg-slate-50"
                variant="outline"
              >
                <ArrowLeft size={16} />
                Back to Roster
              </AppButton>
            </Link>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col items-center gap-4 py-6 border-b">
                        <label
                          htmlFor="avatar-upload"
                          className="relative w-28 h-28 rounded-full bg-slate-100  flex items-center justify-center cursor-pointer overflow-hidden group"
                        >
                          {preview ? (
                            <Image
                              src={preview}
                              alt="Avatar preview"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <span className="text-slate-400 text-sm">
                              Upload
                            </span>
                          )}

                          {/* hover overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100  flex items-center justify-center  text-white text-xs transition">
                            Change
                          </div>
                        </label>

                        <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            // preview
                            const url = URL.createObjectURL(file);
                            setPreview(url);

                            // đưa file vào form
                            field.onChange(file);
                          }}
                        />

                        <div className="text-sm text-slate-500">
                          Athlete Profile Picture
                        </div>
                        <div className="text-xs text-slate-400">
                          Recommended: Square image, max 2MB
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-[#EEF0FF] flex items-center justify-center text-[#5954E6]">
                  👤
                </div>
                <div className="text-sm font-medium">Personal Information</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AppInput
                          {...field}
                          label="Name"
                          placeholder="First and last name"
                          fullWidth
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AppInput
                          {...field}
                          label="Email"
                          placeholder="example@email.com"
                          fullWidth
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AppInput
                          {...field}
                          label="Password"
                          placeholder="****"
                          fullWidth
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AppInput
                          {...field}
                          label="Confirm Password"
                          placeholder="****"
                          fullWidth
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="col-span-2 grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="position_relevance"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-sm font-medium text-black">
                          Position
                        </label>
                        <FormControl>
                          <Select
                            value={field.value ?? ""}
                            onValueChange={(value) =>
                              field.onChange(value === "" ? null : value)
                            }
                            disabled={isLoading}
                          >
                            <SelectTrigger className="h-[48px] w-full">
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>

                            <SelectContent
                              className="h-[260px] overflow-y-auto"
                              position="popper"
                              side="bottom"
                              align="start"
                            >
                              {positions.map((pos) => (
                                <SelectItem key={pos.key} value={pos.key}>
                                  {pos.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AppInput
                            {...field}
                            label="Height (cm)"
                            placeholder="180"
                            fullWidth
                            value={field.value ?? ""}
                            onChange={(event) => {
                              const value = event.target.value;
                              field.onChange(
                                value === "" ? null : Number(value),
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <AppInput
                            {...field}
                            label="Weight (kg)"
                            placeholder="98"
                            fullWidth
                            value={field.value ?? ""}
                            onChange={(event) => {
                              const value = event.target.value;
                              field.onChange(
                                value === "" ? null : Number(value),
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="jersey_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AppInput
                          {...field}
                          label="Jersey number"
                          placeholder="0"
                          fullWidth
                          value={field.value ?? ""}
                          onChange={(event) => {
                            const value = event.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <AppInput
                          {...field}
                          type="date"
                          label="Date of Birth"
                          fullWidth
                          value={field.value ?? ""}
                          onChange={(event) => {
                            const value = event.target.value;
                            field.onChange(value === "" ? null : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fitness_status"
                  render={({ field }) => (
                    <div className="col-span-2">
                      <label className="text-xs text-slate-500">
                        Athlete Status
                      </label>

                      <div className="mt-2 flex gap-2">
                        <AppButton
                          type="button"
                          onClick={() =>
                            field.onChange(AthleteStatus.AVAILABLE)
                          }
                          className={`px-4 py-2 rounded-full border transition ${field.value === AthleteStatus.AVAILABLE ? "bg-white text-[#5954E6] border-[#5954E6]" : "bg-slate-50"}`}
                        >
                          Active
                        </AppButton>

                        <AppButton
                          type="button"
                          onClick={() => field.onChange(AthleteStatus.INJURED)}
                          className={`px-4 py-2 rounded-full border transition ${field.value === AthleteStatus.INJURED ? "bg-white text-[#5954E6] border-[#5954E6]" : "bg-slate-50"}`}
                        >
                          Injured
                        </AppButton>
                      </div>

                      <FormMessage />
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/coach/athletes">
                <Button
                  variant="outline"
                  type="button"
                  className="px-4 py-2 rounded border h-10"
                >
                  Cancel
                </Button>
              </Link>
              <AppButton type="submit">Save Athlete</AppButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
