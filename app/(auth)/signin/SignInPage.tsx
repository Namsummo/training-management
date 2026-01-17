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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DEFAULT_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://vitex.duckdns.org/api/v1").replace(/\/$/, "");

const signInSchema = z.object({
  email: z.string().email("This is an error message"),
  password: z.string().min(4, "This is an error message"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [showPass, setShowpass] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setError(null);
    setLoading(true);
    try {
      const body = new URLSearchParams();
      body.append("email", values.email);
      body.append("password", values.password);

      const res = await fetch(`${DEFAULT_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      const json = await res.json();

      if (json?.success && json?.data?.token) {
        // store token for subsequent requests
        if (typeof window !== "undefined") {
          localStorage.setItem("api_token", json.data.token);
          try {
            localStorage.setItem("api_user", JSON.stringify(json.data.user || {}));
          } catch (e) {
            // ignore storage errors
          }
        }

        // redirect to coach dashboard (or home)
        router.push("/coach/dashboard");
        return;
      }

      setError(json?.message || "Login failed");
    } catch (e) {
      console.error("Login error", e);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
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

          <h1 className="text-2xl font-bold">Hi, Welcome</h1>
          <p className="text-gray-400 mb-8">Please login to your account</p>

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

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-500">
                  <Checkbox className="text-gray-500 border border-gray-400" />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="underline  text-gray-500"
                >
                  Forgot password?
                </Link>
              </div>

              <AppButton
                type="submit"
                fullWidth
                className="mt-2"
                disabled={!form.formState.isValid}
                variant={form.formState.isValid ? "default" : "light"}
              >
                Login
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
                  Sign in with Google
                </AppButton>

                <AppButton variant="light" fullWidth>
                  <Image
                    src="/images/LogosApple.png"
                    alt="apple"
                    width={20}
                    height={20}
                  />
                  Sign in with Apple
                </AppButton>
              </div>

              {/* Register */}
              <div className="flex justify-center gap-2 text-sm text-gray-500">
                <span>Don’t have an account?</span>
                <Link
                  href="/signup"
                  className="text-primary underline font-medium"
                >
                  Register
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
