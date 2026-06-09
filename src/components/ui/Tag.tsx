interface TagProps {
  children: string;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300">
      {children}
    </span>
  );
}
