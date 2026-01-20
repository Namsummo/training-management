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
import { ArrowLeft, MailboxIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const forgetPassword = z.object({
  email: z.string().email("This is an error message"),
});

type ForgetFormValues = z.infer<typeof forgetPassword>;

export default function ForgetPassword() {
  const router = useRouter();
  const form = useForm<ForgetFormValues>({
    resolver: zodResolver(forgetPassword),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgetFormValues) {
    console.log(values);
    router.push(`/confirm-page?email=${encodeURIComponent(values.email)}`);
  }

  return (
    <div className="flex min-h-screen">
      {/* LEFT - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-8">
          {/* Logo */}
          <Image
            src="/images/adjoe-logo.png"
            alt="logo"
            width={159}
            height={44}
            className="mb-6"
          />

          <h1 className="text-2xl font-bold">Forget Password</h1>
          <p className="text-gray-400 mb-8">
            No worries, we will send you reset instructions
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        leftIcon={
                          <MailboxIcon size={16} className="text-black" />
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
                className="mt-2"
                disabled={!form.formState.isValid}
                variant={form.formState.isValid ? "default" : "light"}
              >
                Send
              </AppButton>
              <AppButton
                type="button"
                fullWidth
                className="mt-2 border-none text-primary font-medium"
                variant={"outline"}
                onClick={() => router.push("/login")}
              >
                <ArrowLeft size={20} className="text-black" />
                Back
              </AppButton>
            </form>
          </Form>
        </div>
      </div>

      {/* RIGHT - IMAGE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-50">
        <Image
          src="/images/logoPassword.png"
          alt="login visual"
          width={420}
          height={420}
          priority
        />
      </div>
    </div>
  );
}
