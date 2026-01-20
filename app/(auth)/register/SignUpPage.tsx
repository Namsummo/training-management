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
import {
  EyeClosedIcon,
  EyeIcon,
  MailboxIcon,
  RectangleEllipsisIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSignUp } from "@/shared/service/hooks/mutations/signUp.mutation";
import { SignUpRequest } from "@/shared/service/types/signUp.type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signUpSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [showPass, setShowpass] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate, isPending } = useSignUp();
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  function onSubmit(values: SignUpFormValues) {
    const payload: SignUpRequest = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    mutate(payload, {
      onSuccess: (res) => {
        toast.success("Success", {
          description: res.message,
        });

        form.reset();
        router.push("/athlete/dashboard");
      },
      onError: () => {
        toast.error("Error", { description: "Invalid information" });
      },
    });
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

          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-gray-400 mb-8">Please login to your account</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AppInput
                        {...field}
                        label="Name"
                        placeholder="First and Last name"
                        fullWidth
                        leftIcon={<User size={16} className="text-black" />}
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
                        leftIcon={
                          <MailboxIcon size={16} className="text-black" />
                        }
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
                        type={showPass ? "text" : "password"}
                        label="Password"
                        placeholder="input your password"
                        fullWidth
                        leftIcon={
                          <RectangleEllipsisIcon
                            size={16}
                            className="text-black"
                          />
                        }
                        rightIcon={
                          <Button
                            className="border-none hover:bg-white"
                            type="button"
                            variant="outline"
                            onClick={() => setShowpass((prev) => !prev)}
                          >
                            {showPass ? (
                              <EyeIcon size={16} className="text-black" />
                            ) : (
                              <EyeClosedIcon size={16} className="text-black" />
                            )}
                          </Button>
                        }
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
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm password"
                        placeholder="Re-enter your password"
                        fullWidth
                        leftIcon={
                          <RectangleEllipsisIcon
                            size={16}
                            className="text-black"
                          />
                        }
                        rightIcon={
                          <Button
                            type="button"
                            variant="outline"
                            className="border-none hover:bg-white"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeIcon size={16} className="text-black" />
                            ) : (
                              <EyeClosedIcon size={16} className="text-black" />
                            )}
                          </Button>
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
                {isPending ? "Signing up ..." : "Signup"}
              </AppButton>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200" />
                <p className="text-sm text-gray-400 whitespace-nowrap">
                  Or login with
                </p>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Social */}
              <div className="flex gap-3">
                <AppButton variant="light" fullWidth>
                  <Image
                    src="/images/LogosGoogle.png"
                    alt="google"
                    width={20}
                    height={20}
                  />
                  Sign up with Google
                </AppButton>

                <AppButton variant="light" fullWidth>
                  <Image
                    src="/images/LogosApple.png"
                    alt="apple"
                    width={20}
                    height={20}
                  />
                  Sign up with Apple
                </AppButton>
              </div>

              {/* Register */}
              <div className="flex justify-center gap-2 text-sm text-gray-500">
                <span>Don’t have an account?</span>
                <Link
                  href="/login"
                  className="text-primary underline font-medium"
                >
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* RIGHT - IMAGE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-50">
        <Image
          src="/images/logoSignin.png"
          alt="login visual"
          width={420}
          height={420}
          priority
        />
      </div>
    </div>
  );
}
