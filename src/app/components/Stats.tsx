import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";

const valueProps = [
  "Website dirancang untuk meningkatkan kepercayaan pelanggan",
  "Optimasi dasar SEO untuk visibilitas di Google",
  "Proses transparan & komunikasi langsung",
  "Support setelah website selesai",
];

export function Stats() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-0 relative overflow-hidden" ref={ref}>
      <div className="bg-neutral-900 py-12 md:py-16 relative overflow-hidden">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        {/* Floating Background Accents */}
        <motion.div
          className="absolute top-[20%] left-[5%] w-48 h-48 rounded-full border border-white/5"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[8%] w-32 h-32 rounded-full bg-white/[0.02]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {valueProps.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <p
                  className="text-neutral-300 text-[0.9375rem] leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
