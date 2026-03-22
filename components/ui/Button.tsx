import Link from "next/link";

type BaseProps = {
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

type AsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
  };

type AsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
    href: string;
  };

type ButtonProps = AsButton | AsAnchor;

const variantClasses: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-primary text-white hover:bg-secondary focus-visible:outline-primary",
  outline:
    "border border-white/30 text-white hover:bg-white/10 focus-visible:outline-white",
};

const sizeClasses: Record<NonNullable<BaseProps["size"]>, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center font-semibold tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [base, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as AsAnchor;
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
