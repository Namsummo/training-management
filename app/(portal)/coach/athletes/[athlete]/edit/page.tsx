"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { ArrowLeft } from "lucide-react";
import { useUpdateAthleteMutation } from "@/shared/service/hooks/mutations/updateAthlete.mutation";
import { useUpdateAvatarMutation } from "@/shared/service/hooks/mutations/updateAvatar.mutation";
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
import { UpdateAthleteRequest } from "@/shared/service/types/updateAthlete.type";
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
import { useAthleteDetailQuery } from "@/shared/service/hooks/queries/useAthleteDetail.query";
import {
  UpdateAthleteFormValues,
  updateAthleteSchema,
} from "./contants/updateSchema.type";

export default function EditAthletePage() {
  const router = useRouter();
  const params = useParams() as { athlete?: string };
  const athleteId = params?.athlete ?? "";
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const { data: positions = [], isLoading: positionsLoading } =
    usePositionEnumQuery();
  const { mutate: updateAthleteMutation, isPending: isUpdating } =
    useUpdateAthleteMutation();
  const { mutate: updateAvatarMutation } = useUpdateAvatarMutation();
  const { data: athleteData, isLoading: isLoadingAthlete } =
    useAthleteDetailQuery(athleteId);

  const [preview, setPreview] = useState<string | null>(
    athleteData?.data?.avatar ?? null,
  );

  console.log(preview);
  console.log(athleteData?.data?.avatar);

  const form = useForm<UpdateAthleteFormValues>({
    resolver: zodResolver(updateAthleteSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      birthday: null,
      height: null,
      weight: null,
      position_relevance: null,
      athlete_status: AthleteStatus.ACTIVE,
      // fitness_status: FitnessStatus.AVAILABLE ?? FitnessStatus.INJURED;
      jersey_number: null,
      avatar: null, // Avatar is forced to be a File instance
    },
  });

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrlRef.current && previewUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  // Populate form when athlete data is loaded
  useEffect(() => {
    if (athleteData?.data) {
      const athlete = athleteData.data;

      // Cleanup previous blob URL if exists
      if (previewUrlRef.current && previewUrlRef.current.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }

      form.reset({
        name: athlete.name || "",
        email: athlete.email || "",
        password: "",
        password_confirmation: "",
        birthday: athlete.birthday || null,
        height: athlete.height ?? null,
        weight: athlete.weight ?? null,
        position_relevance: athlete.position_relevance || null,
        athlete_status:
          (athlete.athlete_status as AthleteStatus) || AthleteStatus.ACTIVE,
        jersey_number: athlete.jersey_number ?? null,
        avatar: null,
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Set preview if avatar exists (from server URL)
      // Using setTimeout to avoid setState in effect warning
      setTimeout(() => {
        if (athlete.avatar) {
          setPreview(athlete.avatar);
          previewUrlRef.current = athlete.avatar;
        } else {
          setPreview(null);
          previewUrlRef.current = null;
        }
      }, 0);
    }
  }, [athleteData, form]);

  function handleSave(values: UpdateAthleteFormValues) {
    // Check if athleteId is valid
    if (!athleteId || athleteId.trim() === "") {
      toast.error("Error", {
        description: "Athlete ID is missing",
      });
      return;
    }

    const payload: UpdateAthleteRequest = {
      name: values.name,
      email: values.email,
      position_relevance: values.position_relevance,
      height: values.height,
      weight: values.weight,
      birthday: values.birthday,
      athlete_status: values.athlete_status || AthleteStatus.ACTIVE,
      jersey_number: values.jersey_number,
    };

    // Only include password if provided
    if (values.password && values.password.trim().length > 0) {
      payload.password = values.password;
      payload.password_confirmation = values.password_confirmation || "";
    }

    // Avatar is already uploaded on file change, so we don't need to upload it again
    // Update athlete profile
    updateAthleteMutation(
      { userId: athleteId, payload },
      {
        onSuccess: (res) => {
          toast.success("Success", {
            description: res.message || "Athlete profile updated successfully",
          });
          router.push(`/coach/athletes/${athleteId}`);
        },
        onError: (
          error: Error & { response?: { data?: { message?: string } } },
        ) => {
          toast.error("Error", {
            description:
              error?.response?.data?.message ||
              "Failed to update athlete profile",
          });
        },
      },
    );
  }

  if (isLoadingAthlete) {
    return (
      <div className="p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg border p-6">
          <div className="text-center py-12">Loading athlete data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Edit Athlete Profile</h1>
            <div className="text-sm text-slate-500 mt-1">
              Update athlete information and profile details.
            </div>
          </div>
          <div>
            <Link href={`/coach/athletes/${athleteId}`}>
              <AppButton
                className="text-sm px-3 py-2 border rounded bg-slate-50"
                variant="outline"
              >
                <ArrowLeft size={16} />
                Back to Profile
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
                          className={`relative w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer overflow-hidden group ${
                            isUploadingAvatar
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
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

                          {/* Loading overlay */}
                          {isUploadingAvatar && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <div className="text-white text-xs">
                                Uploading...
                              </div>
                            </div>
                          )}

                          {/* hover overlay */}
                          {!isUploadingAvatar && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
                              Change
                            </div>
                          )}
                        </label>

                        <Input
                          ref={fileInputRef}
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          hidden
                          disabled={isUploadingAvatar}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            // Validate file size (max 2MB)
                            if (file.size > 2 * 1024 * 1024) {
                              toast.error("File too large", {
                                description:
                                  "Please select an image smaller than 2MB",
                              });
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                              return;
                            }

                            // Validate file type
                            if (!file.type.startsWith("image/")) {
                              toast.error("Invalid file type", {
                                description: "Please select an image file",
                              });
                              if (fileInputRef.current) {
                                fileInputRef.current.value = "";
                              }
                              return;
                            }

                            // Cleanup previous blob URL if exists
                            if (
                              previewUrlRef.current &&
                              previewUrlRef.current.startsWith("blob:")
                            ) {
                              URL.revokeObjectURL(previewUrlRef.current);
                            }

                            // Create new preview URL immediately for better UX
                            const url = URL.createObjectURL(file);
                            setPreview(url);
                            previewUrlRef.current = url;

                            // Set file into form
                            field.onChange(file);

                            // Upload avatar immediately
                            setIsUploadingAvatar(true);
                            updateAvatarMutation(
                              { userId: athleteId, avatarFile: file },
                              {
                                onSuccess: (res) => {
                                  setIsUploadingAvatar(false);
                                  toast.success("Success", {
                                    description:
                                      res.message ||
                                      "Avatar updated successfully",
                                  });

                                  // Update preview with server URL if available
                                  if (res.data?.avatar) {
                                    // Cleanup blob URL
                                    if (
                                      previewUrlRef.current &&
                                      previewUrlRef.current.startsWith("blob:")
                                    ) {
                                      URL.revokeObjectURL(
                                        previewUrlRef.current,
                                      );
                                    }
                                    setPreview(res.data.avatar);
                                    previewUrlRef.current = res.data.avatar;
                                  }

                                  // Clear file input to allow re-uploading same file
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }
                                  // Clear form field since avatar is already uploaded
                                  field.onChange(null);
                                },
                                onError: (
                                  error: Error & {
                                    response?: { data?: { message?: string } };
                                  },
                                ) => {
                                  setIsUploadingAvatar(false);
                                  toast.error("Error", {
                                    description:
                                      error?.response?.data?.message ||
                                      "Failed to upload avatar",
                                  });
                                  // Reset preview and file input on error
                                  if (
                                    previewUrlRef.current &&
                                    previewUrlRef.current.startsWith("blob:")
                                  ) {
                                    URL.revokeObjectURL(previewUrlRef.current);
                                  }
                                  // Restore previous preview if available
                                  if (athleteData?.data?.avatar) {
                                    setPreview(athleteData.data.avatar);
                                    previewUrlRef.current =
                                      athleteData.data.avatar;
                                  } else {
                                    setPreview(null);
                                    previewUrlRef.current = null;
                                  }
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }
                                  field.onChange(null);
                                },
                              },
                            );
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
                          type="password"
                          label="Password (leave blank to keep current)"
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
                          type="password"
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
                            disabled={positionsLoading}
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
                  name="athlete_status"
                  render={({ field }) => (
                    <div className="col-span-2">
                      <label className="text-xs text-slate-500">
                        Athlete Status
                      </label>

                      <div className="mt-2 flex gap-2">
                        <AppButton
                          type="button"
                          onClick={() => field.onChange(AthleteStatus.ACTIVE)}
                          className={`px-4 py-2 rounded-full border text-[#5954E6] transition ${
                            field.value === AthleteStatus.ACTIVE
                              ? "bg-white border-[#5954E6]"
                              : "bg-slate-50"
                          }`}
                        >
                          Active
                        </AppButton>

                        <AppButton
                          type="button"
                          onClick={() => field.onChange(AthleteStatus.INJURED)}
                          className={`px-4 py-2 rounded-full border text-[#5954E6] transition ${
                            field.value === AthleteStatus.INJURED
                              ? "bg-white border-[#5954E6]"
                              : "bg-slate-50"
                          }`}
                        >
                          Injured
                        </AppButton>

                        <AppButton
                          type="button"
                          onClick={() => field.onChange(AthleteStatus.INACTIVE)}
                          className={`px-4 py-2 rounded-full border text-[#5954E6] transition ${
                            field.value === AthleteStatus.INACTIVE
                              ? "bg-white border-[#5954E6]"
                              : "bg-slate-50"
                          }`}
                        >
                          Inactive
                        </AppButton>
                      </div>

                      <FormMessage />
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Link href={`/coach/athletes/${athleteId}`}>
                <Button
                  variant="outline"
                  type="button"
                  className="px-4 py-2 rounded border h-10"
                >
                  Cancel
                </Button>
              </Link>
              <AppButton
                type="submit"
                disabled={isUpdating || isUploadingAvatar}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </AppButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
