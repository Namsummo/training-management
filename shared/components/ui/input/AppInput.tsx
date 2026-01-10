"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputContainerVariants = cva(
  // base container styles
  "relative flex items-center w-[480px] h-[48px] rounded-md border border-slate-200 bg-background transition-colors hover:border-[#4541b3] focus-within:border-[#4541b3] focus-within:ring-2 focus-within:ring-[#4541b3]/20",
  {
    variants: {
      variant: {
        default: "",
        error:
          "border-red-300 hover:border-red-500 focus-within:border-red-500 focus-within:ring-red-200",
        success:
          "border-green-300 hover:border-green-500 focus-within:border-green-500 focus-within:ring-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const inputVariants = cva(
  // base input styles
  "flex-1 h-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      hasLeftIcon: {
        true: "pl-10",
        false: "",
      },
      hasRightIcon: {
        true: "pr-10",
        false: "",
      },
    },
  }
);

export interface AppInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputContainerVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      className,
      variant,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth,
      id,
      type = "text",
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error || variant === "error");
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            inputContainerVariants({
              variant: hasError ? "error" : variant,
            }),
            fullWidth && "w-full",
            className
          )}
        >
          {leftIcon && (
            <div className="absolute left-3 flex items-center text-slate-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              inputVariants({
                hasLeftIcon,
                hasRightIcon,
              })
            )}
            {...(hasError && { "aria-invalid": true })}
            aria-describedby={
              error || helperText
                ? `${inputId}-${error ? "error" : "helper"}`
                : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";
