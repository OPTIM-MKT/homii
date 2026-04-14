import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight " +
  "transition-all duration-200 ease-out will-change-transform " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-[var(--bg)] disabled:opacity-50 disabled:pointer-events-none " +
  "active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-shadePrimary shadow-[0_10px_30px_-10px_rgba(9,173,5,0.55)]",
  secondary:
    "bg-bluePrimary text-white hover:bg-shadeBluePrimary shadow-[0_10px_30px_-10px_rgba(8,73,170,0.55)]",
  outline:
    "border border-[var(--border)] text-[var(--fg)] hover:bg-[var(--bg-2)]",
  ghost: "text-[var(--fg)] hover:bg-[var(--bg-2)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

function classes(
  variant: Variant,
  size: Size,
  fullWidth: boolean,
  extra?: string,
) {
  return [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full" : "",
    extra ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    children,
    className,
    ...rest
  } = props as BaseProps & {
    className?: string;
    href?: string;
  } & Record<string, unknown>;

  const cls = classes(variant, size, fullWidth, className);
  const content = (
    <>
      {leadingIcon ? <span className="shrink-0">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="shrink-0">{trailingIcon}</span> : null}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={cls} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={cls}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
