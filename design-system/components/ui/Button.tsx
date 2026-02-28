import React from "react";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary text-white",
    "hover:bg-primary-hover",
    "active:bg-primary-active",
    "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "disabled:bg-disabled-bg disabled:text-disabled-text disabled:cursor-not-allowed",
  ].join(" "),

  secondary: [
    "bg-surface text-primary border border-border",
    "hover:bg-primary-light hover:border-primary",
    "active:bg-primary-light active:border-primary-active",
    "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "disabled:bg-disabled-bg disabled:text-disabled-text disabled:border-border disabled:cursor-not-allowed",
  ].join(" "),

  danger: [
    "bg-danger text-white",
    "hover:bg-danger-hover",
    "active:bg-danger-hover",
    "focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2",
    "disabled:bg-disabled-bg disabled:text-disabled-text disabled:cursor-not-allowed",
  ].join(" "),

  ghost: [
    "bg-transparent text-text-secondary",
    "hover:bg-primary-light hover:text-primary",
    "active:bg-primary-light active:text-primary-active",
    "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
    "disabled:text-disabled-text disabled:cursor-not-allowed disabled:bg-transparent",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-md gap-1.5",
  md: "h-10 px-4 text-base rounded-md gap-2",
  lg: "h-12 px-6 text-lg rounded-md gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const classes = [
      "inline-flex items-center justify-center font-medium",
      "transition-all-fast select-none",
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
