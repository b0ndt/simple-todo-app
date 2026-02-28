import React from "react";

export type CardVariant = "default" | "interactive" | "completed";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  disabled?: boolean;
  children: React.ReactNode;
}

const baseClasses = [
  "bg-surface border border-border rounded-lg p-4",
  "transition-all-fast",
].join(" ");

const variantClasses: Record<CardVariant, string> = {
  default: "shadow-sm",

  interactive: [
    "shadow-sm cursor-pointer",
    "hover:shadow-md hover:border-border-focus",
    "active:shadow-sm active:scale-[0.99]",
    "focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
  ].join(" "),

  completed: [
    "shadow-sm",
    "bg-success-light border-success/20",
  ].join(" "),
};

const disabledClasses =
  "opacity-60 pointer-events-none bg-disabled-bg border-border";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", disabled = false, className = "", children, ...props }, ref) => {
    const classes = [
      baseClasses,
      variantClasses[variant],
      disabled ? disabledClasses : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
