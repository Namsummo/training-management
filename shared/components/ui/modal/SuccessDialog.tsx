"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type SuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;
  buttonText?: string;

  dialogWidth?: string;
  dialogHeight?: string;

  buttonWidth?: string;
  buttonHeight?: string;

  onConfirm?: () => void;
};

export function SuccessDialog({
  open,
  onOpenChange,
  title = "",
  description = "",
  buttonText = "",

  dialogWidth = "w-[400px]",
  dialogHeight = "h-[384px]",

  buttonWidth = "w-[352px]",
  buttonHeight = "h-[48px]",

  onConfirm,
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${dialogWidth} ${dialogHeight}
          flex flex-col items-center justify-center
          rounded-xl p-6
        `}
      >
        {/* Icon */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <Check className="h-8 w-8 text-emerald-500" />
        </div>

        {/* Text */}
        <DialogHeader className="items-center">
          <DialogTitle className="text-center text-2xl font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>

        <p className="mt-2 text-center text-sm text-muted-foreground max-w-[320px]">
          {description}
        </p>

        {/* Button */}
        <Button
          className={`
            mt-6
            ${buttonWidth} ${buttonHeight}
            bg-[#4541B3] hover:bg-[#4541B3]/90
            text-base font-medium
          `}
          onClick={onConfirm}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
