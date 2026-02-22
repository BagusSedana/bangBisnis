import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Globe, Search, Zap, RefreshCw, BarChart3, ArrowUpRight } from 'lucide-react';

const openWA = (topic = '') => {
    const msg = encodeURIComponent(`Halo Bang Bisnis! Saya tertarik dengan layanan ${topic}, bisa info lebih lanjut?`);
    window.open(`https://wa.me/6287701785344?text=${msg}`, '_blank', 'noopener,noreferrer');
};

export default function Services() {
    return (
        <section className="section" id="layanan" style={{ background: 'var(--bg)' }}>
            <div className="container">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}
                >
                    <div>
                        <div className="section-label"><Zap size={13} /> Layanan Kami</div>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>
                            Satu Studio,<br />Semua Solusi <em className="font-serif text-gradient" style={{ fontWeight: 600, fontStyle: 'italic' }}>Digital.</em>
                        </h2>
                    </div>
                    <p style={{ maxWidth: 340, color: 'var(--white-60)', fontSize: 15, lineHeight: 1.7 }}>
                        Dari landing page simpel sampai ekosistem website bisnis lengkap. Semua dikerjakan dengan standar tinggi, harga lokal.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="services-grid">

                    {/* Card 1 — Featured wide (col 1-8) */}
                    <BentoCard
                        style={{}}
                        delay={0}
                        accent="#f5c518"
                        icon={<Layers size={28} />}
                        tag="PALING POPULER"
                        title="Landing Page Konversi Tinggi"
                        desc="Satu halaman yang dirancang khusus untuk mengubah pengunjung menjadi pelanggan. Copywriting persuasif, desain premium, dan CTA yang tepat sasaran."
                        visual={
                            <div style={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.12 }}>
                                <Layers size={200} strokeWidth={0.5} color="#f5c518" />
                            </div>
                        }
                        topic="Landing Page"
                    />

                    <BentoCard
                        style={{}}
                        delay={0.05}
                        accent="#8b5cf6"
                        icon={<Globe size={24} />}
                        title="Website Profil Bisnis"
                        desc="Multi-halaman profesional untuk kredibilitas bisnis kamu."
                        topic="Website Profil"
                    />

                    <BentoCard
                        style={{}}
                        delay={0.1}
                        accent="#06b6d4"
                        icon={<Search size={24} />}
                        title="Optimasi SEO"
                        desc="Struktur konten, meta tag, dan schema agar mudah ditemukan Google."
                        topic="SEO"
                    />

                    <BentoCard
                        style={{}}
                        delay={0.15}
                        accent="#10b981"
                        icon={<Zap size={24} />}
                        title="Performa & Kecepatan"
                        desc="Loading super cepat. Skor Lighthouse tinggi. Pengunjung tidak kabur."
                        topic="Performa"
                    />

                    <BentoCard
                        style={{}}
                        delay={0.2}
                        accent="#f97316"
                        icon={<RefreshCw size={24} />}
                        title="Maintenance Bulanan"
                        desc="Update konten & revisi tiap bulan tanpa perlu tahu coding."
                        topic="Maintenance"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(245,197,24,0.08) 0%, rgba(245,197,24,0.02) 100%)',
                            border: '1px solid rgba(245,197,24,0.2)',
                            borderRadius: 20,
                            padding: '28px 36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 24,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: 14,
                                background: 'rgba(245,197,24,0.15)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--accent)',
                            }}>
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>Integrasi Analytics & Pixel</div>
                                <div style={{ color: 'var(--white-60)', fontSize: 14 }}>Google Analytics, Meta Pixel, Google Tag Manager — semua terpasang rapi sejak awal.</div>
                            </div>
                        </div>
                        <button
                            onClick={() => openWA('Analytics')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: 'rgba(245,197,24,0.12)', border: '1px solid rgba(245,197,24,0.3)',
                                color: 'var(--accent)', borderRadius: 99,
                                padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Pelajari <ArrowUpRight size={15} />
                        </button>
                    </motion.div>

                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .bento-8 { grid-column: span 12 !important; }
          .bento-4 { grid-column: span 12 !important; }
        }
      `}</style>
        </section>
    );
}

function BentoCard({ style, delay, accent, icon, tag, title, desc, visual, topic }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            onClick={() => openWA(topic)}
            style={{
                ...style,
                background: 'var(--bg-card)',
                border: `1px solid ${tag ? 'rgba(245,197,24,0.25)' : 'var(--border)'}`,
                borderRadius: 20,
                padding: '28px 32px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                minHeight: 180,
            }}
            whileHover={{
                y: -5,
                borderColor: accent + '55',
                boxShadow: `0 20px 60px ${accent}18`,
            }}
        >
            {tag && (
                <div style={{
                    position: 'absolute', top: 20, right: 20,
                    background: 'var(--accent)', color: '#000',
                    fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 99,
                    letterSpacing: '0.5px',
                }}>
                    {tag}
                </div>
            )}

            {visual}

            <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `${accent}18`,
                border: `1px solid ${accent}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: accent, marginBottom: 18,
            }}>
                {icon}
            </div>

            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: 'var(--white)' }}>
                {title}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--white-60)', lineHeight: 1.7, maxWidth: 440 }}>
                {desc}
            </p>

            <div style={{
                position: 'absolute', bottom: 24, right: 24,
                width: 32, height: 32, borderRadius: '50%',
                background: `${accent}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: accent,
                opacity: 0,
                transition: 'opacity 0.2s',
            }} className="card-arrow">
                <ArrowUpRight size={16} />
            </div>
        </motion.div>
    );
}
