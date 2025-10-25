// @ts-nocheck
import * as React from "react";
import { cn } from "./utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
