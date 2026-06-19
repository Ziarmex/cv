interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-[#0d0d0f] dark:bg-black/40 overflow-hidden">
      {language && (
        <div className="px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-gray-500 border-b border-white/5">
          {language}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed text-gray-300 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
