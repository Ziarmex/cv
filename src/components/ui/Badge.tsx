import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  dot?: boolean;
}

export default function Badge({ children, dot }: BadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-[0.15em] bg-crimson/10 dark:bg-crimson/10 text-crimson dark:text-crimson">
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
      )}
      {children}
    </div>
  );
}
