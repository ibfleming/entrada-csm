import React from "react";
import { type InputProps } from "../ui/input";
import { cn } from "~/lib/utils";

export interface DateInputProps extends InputProps {
  icon?: React.ReactNode;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="flex h-9 w-full items-center justify-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-md transition-colors focus-within:ring-1 focus-within:ring-primary">
        <input
          type={type}
          className={cn(
            "font-inter text-neutral-800 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon}
      </div>
    );
  },
);
DateInput.displayName = "DateInput";

export { DateInput };
