import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string;
  index?: number;
}

export default function MetricCard({ label, value, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6"
    >
      <div className="text-3xl md:text-4xl font-bold tracking-tight text-crimson font-mono">
        {value}
      </div>
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </motion.div>
  );
}
