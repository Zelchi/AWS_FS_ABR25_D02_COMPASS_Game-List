import { InputHTMLAttributes, forwardRef } from "react";
// import { cn } from "@/src/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} {...props} />;
  },
);

Input.displayName = "Input";
