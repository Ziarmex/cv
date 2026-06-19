import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  dot?: boolean;
  className?: string;
}

export default function Badge({ children, dot, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crimson/10 dark:bg-crimson/15 text-crimson-dark dark:text-crimson text-xs font-medium border border-crimson/20 ${className}`}
    >
      {dot && (
        <span className="relative flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full rounded-full bg-crimson animate-ping opacity-60" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-crimson" />
        </span>
      )}
      {children}
    </span>
  );
}
