import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputHero = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      input.value = input.value.slice(0, 3);
    };

    return (
      <input
        type="number"
        maxLength={3}
        className={cn(
          "flex h-auto w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-5xl",
          className
        )}
        onInput={handleInput}
        {...props}
      />
    );
  }
);
InputHero.displayName = "Input";

export { InputHero };
