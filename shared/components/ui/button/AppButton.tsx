"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // base
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#4541b3] text-white hover:opacity-90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        light: "bg-[#E9ECEF] text-black hover:bg-[#DEE2E6]",
      },

      size: {
        default: "h-10 w-[175px] px-4 text-sm",

        sm: "h-8 px-3 text-sm font-normal",
        md: "h-10 px-4",
        lg: "h-10 px-6 text-base",
        icon: "h-9 w-9",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

AppButton.displayName = "AppButton";
