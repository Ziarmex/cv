import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono text-gray-600 dark:text-gray-300 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
      {children}
    </span>
  );
}
