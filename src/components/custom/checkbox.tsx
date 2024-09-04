import React from "react";
import { Label } from "@/ui/label";
import { Checkbox as RadixCheckbox } from "@/ui/checkbox";

interface CheckboxProps {
  id: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export default function Checkbox({
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
