"use client";

import { cn } from "~/lib/utils";
import React from "react";
import { Label } from "@/ui/label";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { Checkbox as RadixCheckbox } from "@/ui/checkbox";

interface CheckboxProps {
  id?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

function CheckboxWithText({
  id,
  label,
  className,
  disabled = false,
}: CheckboxProps) {
  return (
    <div
      className={`flex items-center space-x-2 font-inter text-primary ${className}`}
    >
      <RadixCheckbox id={id} disabled={disabled} />
      {label && (
        <Label
          htmlFor={id}
          className={`cursor-pointer text-xs font-medium leading-none ${disabled ? "peer-disabled:cursor-not-allowed peer-disabled:opacity-70" : ""}`}
        >
          {label}
        </Label>
      )}
    </div>
  );
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer flex h-4 max-h-4 min-h-4 w-4 min-w-4 max-w-4 shrink items-center justify-center rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <CheckIcon className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, CheckboxWithText };
