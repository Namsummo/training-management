"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { ArrowLeft, CodeXmlIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SuccessDialog } from "@/shared/components/ui/modal/SuccessDialog";

const confirmSchema = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .regex(/^\d+$/, "Code must be numbers only")
    .min(4, "Code must be 4 digits"),
});

type ConfirmFormValues = z.infer<typeof confirmSchema>;

export default function ConfirmPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);

  const form = useForm<ConfirmFormValues>({
    resolver: zodResolver(confirmSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(values: ConfirmFormValues) {
    console.log(values);
    setOpenSuccess(true);
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          <Image
            src="/images/adjoe-logo.png"
            alt="logo"
            width={159}
            height={44}
            className="mb-6"
          />

          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-gray-400 mb-8">
            We sent a code to{" "}
            <span className="font-medium text-black">
              {email ?? "your email"}
            </span>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AppInput
                        {...field}
                        label="Code"
                        placeholder="1234"
                        fullWidth
                        inputMode="numeric"
                        pattern="[0-9]*"
                        leftIcon={
                          <CodeXmlIcon size={16} className="text-black" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <AppButton
                type="submit"
                fullWidth
                disabled={!form.formState.isValid}
                variant={form.formState.isValid ? "default" : "light"}
              >
                Confirm
              </AppButton>

              <AppButton
                type="button"
                fullWidth
                variant="outline"
                className="border-none text-primary"
                onClick={() => router.push("/forgot-password")}
              >
                <ArrowLeft size={20} />
                Back
              </AppButton>
            </form>
          </Form>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-50">
        <Image
          src="/images/logoPassword.png"
          alt="login visual"
          width={420}
          height={420}
        />
      </div>
      <SuccessDialog
        open={openSuccess}
        onOpenChange={setOpenSuccess}
        title="Password updated successfully"
        description="Your password has been successfully updated, please log in first"
        buttonText="Login Now"
        onConfirm={() => router.push("/login")}
      />
    </div>
  );
}
