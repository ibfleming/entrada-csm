"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/ui/toast";
import { Check } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} {...props} variant={variant}>
            <div className="flex flex-row items-center justify-start gap-1 align-middle">
              {variant === "custom" && <Check className="mr-2 h-4 w-4" />}
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose
              className={`${variant === "custom" ? "text-background hover:text-background" : ""}`}
            />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
