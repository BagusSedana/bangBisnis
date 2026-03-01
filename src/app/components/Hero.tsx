import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { BrowserMockup } from "./BrowserMockup";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 pb-32 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Floating circles */}
      <motion.div
        className="absolute top-32 left-[10%] w-72 h-72 rounded-full bg-neutral-100"
        animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-[10%] w-48 h-48 rounded-full bg-neutral-50 border border-neutral-200"
        animate={{ y: [0, 15, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[60%] left-[60%] w-24 h-24 rounded-full bg-neutral-200/50"
        animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-600 px-4 py-1.5 rounded-full mb-8 text-[0.8125rem]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Melayani project baru di Bali
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] tracking-tight text-neutral-900 mb-6"
          style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600, lineHeight: 1.05 }}
        >
          Jasa Website
          <br />
          <span className="text-neutral-400">Profesional di Bali</span>
          <br />
          untuk Bisnis Lokal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-neutral-500 max-w-lg mx-auto mb-10 text-[1rem] md:text-[1.125rem]"
          style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
        >
          Kami membantu bisnis di Badung, Kuta Selatan, dan Jimbaran tampil profesional, mudah ditemukan di Google, dan siap menerima order dalam 7 hari.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#kontak"
            className="bg-neutral-900 text-white px-8 py-3.5 rounded-full text-[0.9375rem] hover:bg-neutral-800 transition-all hover:shadow-lg hover:shadow-neutral-900/20"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
          >
            Konsultasi Gratis via WhatsApp
          </a>
          <a
            href="#portfolio"
            className="text-neutral-600 px-8 py-3.5 rounded-full text-[0.9375rem] border border-neutral-200 hover:border-neutral-400 transition-all"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
          >
            Lihat Portfolio
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-neutral-400" />
        </motion.div>
      </motion.div>

      {/* Browser Mockup */}
      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 -mb-20">
        <BrowserMockup />
      </div>
    </section>
  );
}