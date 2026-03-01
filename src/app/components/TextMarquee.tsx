import { motion } from "motion/react";

const words = [
  "Website dirancang untuk meningkatkan kepercayaan pelanggan",
  "Optimasi dasar SEO untuk visibilitas di Google",
  "Proses transparan & komunikasi langsung",
  "Support setelah website selesai",
];

export function TextMarquee() {
  return (
    <section className="py-6 overflow-hidden bg-neutral-900 relative">
      {/* Top & bottom subtle gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

      <motion.div
        className="flex gap-6 items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...words, ...words].map((word, i) => (
          <div key={`${word}-${i}`} className="flex items-center gap-6 shrink-0">
            <span
              className="text-[1.25rem] md:text-[1.5rem] text-neutral-500 whitespace-nowrap select-none"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500 }}
            >
              {word}
            </span>
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-neutral-600 shrink-0"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
