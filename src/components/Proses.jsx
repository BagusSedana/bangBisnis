import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, PenTool, CheckCircle2, Rocket, Wifi } from 'lucide-react';

const openWA = () => {
    const msg = encodeURIComponent('Halo Bang Bisnis! Saya siap untuk konsultasi gratis.');
    window.open(`https://wa.me/6287701785344?text=${msg}`, '_blank', 'noopener,noreferrer');
};

// Fake chat messages for card 01 visual
const chatMessages = [
    { from: 'user', text: 'Halo! Saya mau buat website UMKM' },
    { from: 'bb', text: 'Siap! Ceritakan bisnisnya dulu 😊' },
    { from: 'user', text: 'Toko skincare, butuh landing page' },
    { from: 'bb', text: 'Oke, paket Growth cocok untuk kamu 🎯' },
];

// Fake code lines for card 02 visual
const codeLines = [
    { indent: 0, text: 'export default function Hero() {', color: '#f5c518' },
    { indent: 1, text: 'return (', color: '#9ca3af' },
    { indent: 2, text: '<section className="hero">', color: '#60a5fa' },
    { indent: 3, text: '<h1>Bisnis Kamu,', color: '#34d399' },
    { indent: 3, text: '  Lebih Profesional</h1>', color: '#34d399' },
    { indent: 3, text: '<button>Hubungi Kami</button>', color: '#f87171' },
    { indent: 2, text: '</section>', color: '#60a5fa' },
];

export default function Proses() {
    return (
        <section className="section" id="proses" style={{ background: 'var(--bg)' }}>
            <div className="container">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ marginBottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}
                >
                    <div>
                        <div className="section-label">
                            <Rocket size={13} /> Cara Kerja
                        </div>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>
                            Dari Nol ke Live dalam<br />
                            <em className="font-serif text-gradient" style={{ fontStyle: 'italic', fontWeight: 600 }}>3–5 Hari Kerja</em>
                        </h2>
                    </div>
                    <p className="proses-subtitle" style={{ maxWidth: 300, color: 'var(--white-60)', fontSize: 15, lineHeight: 1.7 }}>
                        Proses bersih, transparan — kamu tahu posisinya di mana kapan saja.
                    </p>
                </motion.div>

                {/* BENTO GRID */}
                <div className="proses-grid">

                    {/* ── CARD 01: Konsultasi — TALL LEFT with chat visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        style={{
                            background: 'linear-gradient(160deg, rgba(245,197,24,0.1) 0%, var(--bg-card) 45%)',
                            border: '1px solid rgba(245,197,24,0.25)',
                            borderRadius: 20,
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                        whileHover={{ borderColor: 'rgba(245,197,24,0.5)', boxShadow: '0 0 40px rgba(245,197,24,0.08)' }}
                    >
                        {/* Step badge top */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '6px 14px',
                                background: 'rgba(245,197,24,0.12)', border: '1px solid rgba(245,197,24,0.25)',
                                borderRadius: 99, fontSize: 12, fontWeight: 700, color: 'var(--accent)',
                            }}>
                                <MessageSquare size={13} /> Step 01
                            </div>
                            <div style={{
                                padding: '4px 12px', borderRadius: 99,
                                background: 'rgba(245,197,24,0.15)',
                                fontSize: 11, fontWeight: 800, color: 'var(--accent)', letterSpacing: '0.5px',
                            }}>
                                GRATIS
                            </div>
                        </div>

                        {/* Chat bubble mockup */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                            {chatMessages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: m.from === 'user' ? 10 : -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    style={{
                                        alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '75%',
                                        background: m.from === 'user'
                                            ? 'rgba(245,197,24,0.15)'
                                            : 'rgba(255,255,255,0.06)',
                                        border: `1px solid ${m.from === 'user' ? 'rgba(245,197,24,0.3)' : 'rgba(255,255,255,0.08)'}`,
                                        borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                        padding: '8px 12px',
                                        fontSize: 12.5,
                                        color: m.from === 'user' ? 'rgba(245,197,24,0.9)' : 'var(--white-80)',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {m.text}
                                </motion.div>
                            ))}
                        </div>

                        {/* Title + desc bottom */}
                        <div>
                            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Konsultasi Gratis</h3>
                            <p style={{ fontSize: 13, color: 'var(--white-60)', lineHeight: 1.7, marginBottom: 14 }}>
                                Ceritakan bisnis kamu lewat WhatsApp — kami analisa dan rekomendasikan solusi terbaik.
                            </p>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                padding: '5px 12px',
                                background: 'rgba(245,197,24,0.07)', border: '1px solid rgba(245,197,24,0.18)',
                                borderRadius: 99, fontSize: 12, fontWeight: 600, color: 'var(--accent)',
                            }}>
                                ⏱ 30 menit
                            </div>
                        </div>
                    </motion.div>

                    {/* ── CARD 02: Desain & Coding — WIDE with code visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.08 }}
                        style={{
                            background: '#0e0c1a',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 20,
                            overflow: 'hidden',
                            display: 'flex',
                            position: 'relative',
                        }}
                        whileHover={{ borderColor: 'rgba(255,255,255,0.14)' }}
                    >
                        {/* Code editor */}
                        <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                            {/* Editor header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                                {['#ef4444', '#f59e0b', '#22c55e'].map((c, j) => (
                                    <div key={j} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
                                ))}
                                <div style={{
                                    marginLeft: 8, fontSize: 11, color: 'rgba(255,255,255,0.2)',
                                    fontFamily: 'monospace',
                                }}>
                                    Hero.jsx — Bang Bisnis
                                </div>
                            </div>
                            {/* Code lines */}
                            <div style={{ fontFamily: 'monospace', fontSize: 12, lineHeight: 1.8, flex: 1 }}>
                                {codeLines.map((line, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + i * 0.06 }}
                                        style={{ paddingLeft: line.indent * 16, color: line.color, whiteSpace: 'nowrap' }}
                                    >
                                        {line.text}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right info panel */}
                        <div style={{
                            width: 180, padding: '20px 20px 20px 0',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                        }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '6px 14px',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 99, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                            }}>
                                <PenTool size={12} /> Step 02
                            </div>
                            <div>
                                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Desain & Coding</h3>
                                <p style={{ fontSize: 12.5, color: 'var(--white-60)', lineHeight: 1.65, marginBottom: 14 }}>
                                    Tim kami langsung tancap gas. Pantau progres real-time, kasih feedback kapan saja.
                                </p>
                                <div style={{
                                    display: 'inline-flex', gap: 6, padding: '5px 12px',
                                    background: 'rgba(245,197,24,0.07)', border: '1px solid rgba(245,197,24,0.18)',
                                    borderRadius: 99, fontSize: 12, fontWeight: 600, color: 'var(--accent)',
                                }}>
                                    ⏱ 1–3 hari
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── CARD 03: Review — with checklist visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.14 }}
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: 20,
                            padding: '22px 24px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            overflow: 'hidden',
                            position: 'relative',
                        }}
                        whileHover={{ borderColor: 'rgba(245,197,24,0.25)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '6px 14px',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 99, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                            }}>
                                <CheckCircle2 size={12} /> Step 03
                            </div>
                            {/* Mini checklist visual */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                                {['Desain OK ✓', 'Mobile OK ✓', 'Konten OK ✓'].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.08 }}
                                        style={{
                                            fontSize: 11, fontWeight: 600,
                                            color: 'rgba(52,211,153,0.8)',
                                            background: 'rgba(52,211,153,0.07)',
                                            border: '1px solid rgba(52,211,153,0.15)',
                                            borderRadius: 8, padding: '3px 10px',
                                        }}
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>Review & Revisi</h3>
                            <p style={{ fontSize: 13, color: 'var(--white-60)', lineHeight: 1.65, marginBottom: 12 }}>
                                Kamu cek hasilnya, minta perubahan. Kami tidak selesai sampai mantap.
                            </p>
                            <div style={{
                                display: 'inline-flex', gap: 6, padding: '5px 12px',
                                background: 'rgba(245,197,24,0.07)', border: '1px solid rgba(245,197,24,0.18)',
                                borderRadius: 99, fontSize: 12, fontWeight: 600, color: 'var(--accent)',
                            }}>
                                ⏱ 1–2 hari
                            </div>
                        </div>
                    </motion.div>

                    {/* ── CARD 04: Live — minimal with pulsing green dot */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            background: 'linear-gradient(145deg, rgba(16,185,129,0.1) 0%, var(--bg-card) 60%)',
                            border: '1px solid rgba(16,185,129,0.25)',
                            borderRadius: 20,
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            overflow: 'hidden',
                        }}
                        whileHover={{ borderColor: 'rgba(16,185,129,0.5)', boxShadow: '0 0 40px rgba(16,185,129,0.08)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '6px 14px',
                                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                                borderRadius: 99, fontSize: 12, fontWeight: 700, color: '#34d399',
                            }}>
                                <Rocket size={12} /> Step 04
                            </div>
                        </div>

                        {/* Animated LIVE badge */}
                        <div style={{ textAlign: 'center', padding: '12px 0' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '10px 20px',
                                background: 'rgba(16,185,129,0.15)',
                                border: '1px solid rgba(16,185,129,0.35)',
                                borderRadius: 99,
                            }}>
                                <div style={{
                                    width: 8, height: 8, borderRadius: '50%', background: '#4ade80',
                                    animation: 'pulse-dot 1.5s ease-in-out infinite',
                                }} />
                                <span style={{ fontSize: 13, fontWeight: 800, color: '#4ade80', letterSpacing: '2px' }}>
                                    WEBSITE LIVE
                                </span>
                                <Wifi size={14} style={{ color: '#4ade80' }} />
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 6, color: '#e2faf2' }}>
                                Live & Selesai!
                            </h3>
                            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 12 }}>
                                Website tayang sempurna di domain kamu.
                            </p>
                            <div style={{
                                display: 'inline-flex', gap: 6, padding: '5px 12px',
                                background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)',
                                borderRadius: 99, fontSize: 12, fontWeight: 600, color: '#34d399',
                            }}>
                                ⏱ &lt; 1 hari
                            </div>
                        </div>
                    </motion.div>

                    {/* ── CTA STRIP */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.28 }}
                        style={{
                            background: 'linear-gradient(90deg, rgba(245,197,24,0.07) 0%, rgba(245,197,24,0.02) 100%)',
                            border: '1px solid rgba(245,197,24,0.18)',
                            borderRadius: 16,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '18px 28px',
                            flexWrap: 'wrap',
                            gap: 16,
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {['01', '02', '03', '04'].map((n, i) => (
                                    <div key={i} style={{
                                        width: 28, height: 28, borderRadius: '50%',
                                        border: '1px solid rgba(245,197,24,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 10, fontWeight: 800, color: 'rgba(245,197,24,0.6)',
                                    }}>
                                        {n}
                                    </div>
                                ))}
                            </div>
                            <span style={{ color: 'var(--white-60)', fontSize: 14 }}>
                                Total: <strong style={{ color: 'var(--white)' }}>3–5 hari kerja</strong> dari konsultasi sampai live.
                            </span>
                        </div>
                        <button className="btn-primary" onClick={openWA} style={{ fontSize: 14, padding: '12px 22px' }}>
                            Mulai Sekarang <ArrowRight size={15} />
                        </button>
                    </motion.div>

                </div>
            </div>

            <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @media (max-width: 900px) {
          #proses .bento-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
        </section>
    );
}
