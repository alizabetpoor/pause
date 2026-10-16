import type { AnchorHTMLAttributes, ReactNode } from "react";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function TextLink({ children, className, ...props }: TextLinkProps) {
  return (
    <a
      {...props}
      className={`inline-flex items-center font-mono text-xs uppercase tracking-[0.08em] text-studio-white underline decoration-studio-line underline-offset-4 transition-opacity hover:opacity-70 sm:text-sm ${className ?? ""}`.trim()}
    >
      {children}
    </a>
  );
}
