import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

/**
 * One button, four weights. Square corners, generous tracking — the shop's
 * buttons should read as printed labels rather than app chrome.
 */
const VARIANTS = {
  solid:
    "bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-transparent hover:text-[var(--ink)]",
  accent:
    "bg-[var(--accent)] text-[#FBF7F0] border border-[var(--accent)] hover:bg-transparent hover:text-[var(--accent)]",
  outline:
    "bg-transparent text-[var(--ink)] border border-[var(--line-strong)] hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]",
  ghost: "bg-transparent text-[var(--ink)] border border-transparent hover:border-[var(--line-strong)]",
};

const SIZES = {
  sm: "h-9 px-4 text-[10px]",
  md: "h-12 px-7 text-[11px]",
  lg: "h-14 px-9 text-[11px]",
};

const Button = forwardRef(function Button(
  { as, to, href, variant = "solid", size = "md", className, children, icon, ...props },
  ref,
) {
  const Comp = to ? Link : href ? "a" : as || "button";
  return (
    <Comp
      ref={ref}
      to={to}
      href={href}
      data-cursor={props["data-cursor"] ?? "point"}
      className={cn(
        "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap uppercase",
        "font-sans font-medium tracking-[0.2em] transition-colors duration-500 ease-editorial",
        "disabled:pointer-events-none disabled:opacity-40",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}>
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {icon}
      </span>
    </Comp>
  );
});

export default Button;
