import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight, TrendingUp } from 'lucide-react';

const handleWA = (title) => {
    const msg = encodeURIComponent(`Halo! Saya ingin website seperti portofolio "${title}". Bisa konsultasi?`);
    window.open(`https://wa.me/6287701785344?text=${msg}`, '_blank', 'noopener,noreferrer');
};

/* ─── Mini Chart bars ─── */
const MiniBar = ({ values = [], color = '#f5c518' }) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 52 }}>
        {values.map((v, i) => (
            <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${v}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                style={{ flex: 1, background: color, borderRadius: '3px 3px 0 0', opacity: 0.2 + (i / values.length) * 0.8 }}
            />
        ))}
    </div>
);

/* ─── Mini Sparkline ─── */
const Sparkline = ({ points, color = '#f5c518', width = 120, height = 40 }) => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const xs = points.map((_, i) => (i / (points.length - 1)) * width);
    const ys = points.map(p => height - ((p - min) / range) * (height - 6) - 3);
    const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x} ${ys[i]}`).join(' ');
    return (
        <svg width={width} height={height} style={{ overflow: 'visible' }}>
            <motion.path
                d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r={4} fill={color} />
        </svg>
    );
};

/* ─── Shared tag pill ─── */
const Tag = ({ label, color = 'rgba(245,197,24,0.18)', text = 'var(--accent)' }) => (
    <div style={{
        display: 'inline-flex', padding: '3px 10px', borderRadius: 99,
        background: color, border: `1px solid ${text}44`,
        fontSize: 10, fontWeight: 700, color: text, letterSpacing: '0.4px', textTransform: 'uppercase',
    }}>
        {label}
    </div>
);

export default function Portfolio() {
    return (
        <section className="section" id="portofolio" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
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
                        <div className="section-label"><Layers size={13} /> Portofolio</div>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>
                            Karya yang Bicara<br />
                            Sendiri <em className="font-serif text-gradient" style={{ fontWeight: 600, fontStyle: 'italic' }}>Lewat Hasil.</em>
                        </h2>
                    </div>
                    <button onClick={() => handleWA('proyek saya')} className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
                        Diskusi Proyek Kamu <ArrowUpRight size={15} />
                    </button>
                </motion.div>

                {/* ── BENTO GRID ── */}
                <div className="portfolio-grid-bento">

                    {/* ══ CARD 1: Glow Beauty — TALL LEFT with conversion bar chart ══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55 }}
                        onClick={() => handleWA('Glow Beauty')}
                        style={{
                            background: 'linear-gradient(160deg, rgba(245,158,11,0.1) 0%, var(--bg-card) 50%)',
                            border: '1px solid rgba(245,158,11,0.2)',
                            borderRadius: 20, padding: 26, cursor: 'pointer',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                            overflow: 'hidden', position: 'relative',
                        }}
                        whileHover={{ borderColor: 'rgba(245,158,11,0.45)', boxShadow: '0 0 48px rgba(245,158,11,0.08)' }}
                    >
                        {/* Analytics widget */}
                        <div>
                            <div style={{
                                background: 'rgba(0,0,0,0.35)', borderRadius: 14,
                                border: '1px solid rgba(255,255,255,0.06)',
                                padding: '14px 16px 10px',
                            }}>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 10, fontFamily: 'monospace' }}>
                                    📊 Conversion Rate — 30 hari terakhir
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <div>
                                        <div style={{ fontSize: 28, fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>8.4%</div>
                                        <div style={{ fontSize: 11, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                                            <TrendingUp size={11} /> +3.2% dari bulan lalu
                                        </div>
                                    </div>
                                    <Sparkline points={[2.1, 2.8, 3.0, 3.5, 4.2, 4.0, 5.1, 6.3, 7.0, 8.4]} color="#fbbf24" width={110} height={44} />
                                </div>
                                <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
                                    {[30, 45, 40, 55, 60, 50, 75, 80, 90, 100, 95, 110].map((v, i) => (
                                        <motion.div key={i}
                                            initial={{ height: 0 }} whileInView={{ height: v * 0.5 }}
                                            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }}
                                            style={{
                                                flex: 1, background: `rgba(251,191,36,${0.15 + i * 0.07})`,
                                                borderRadius: '3px 3px 0 0', minHeight: 4,
                                            }}
                                        />
                                    ))}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>
                                    <span>Jan</span><span>Feb</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Tag label="Skincare / E-commerce" color="rgba(245,158,11,0.12)" text="#fbbf24" />
                            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '10px 0 6px' }}>Glow Beauty</h3>
                            <p style={{ fontSize: 13.5, color: 'var(--white-60)', lineHeight: 1.65, marginBottom: 14 }}>
                                Konversi iklan naik 3× setelah pakai landing page baru. ROAS dari 1.8 → 5.4.
                            </p>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {[{ n: '3×', l: 'Konversi' }, { n: '+200%', l: 'ROAS' }].map((s, i) => (
                                    <div key={i} style={{
                                        padding: '6px 14px', borderRadius: 10,
                                        background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.15)',
                                        textAlign: 'center',
                                    }}>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: '#fbbf24' }}>{s.n}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{s.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ══ CARD 2: Dapur Mama — WIDE with order notification feed ══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.07 }}
                        onClick={() => handleWA('Dapur Mama')}
                        style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '22px 28px',
                            cursor: 'pointer', display: 'flex', gap: 32, overflow: 'hidden',
                        }}
                        whileHover={{ borderColor: 'rgba(245,197,24,0.25)' }}
                    >
                        {/* Left: order feed */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 12, fontFamily: 'monospace' }}>
                                🍱 Pesanan Masuk — Hari ini
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                {[
                                    { name: 'Budi S.', item: 'Nasi Box x10', time: '08:12', status: 'Baru' },
                                    { name: 'Rina A.', item: 'Paket Katering x30', time: '09:45', status: 'Proses' },
                                    { name: 'Dian K.', item: 'Nasi Gudeg x5', time: '10:30', status: 'Selesai' },
                                    { name: 'Hendra', item: 'Nasi Box x15', time: '11:02', status: 'Baru' },
                                ].map((o, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            background: 'rgba(255,255,255,0.04)', borderRadius: 10,
                                            padding: '8px 12px', border: '1px solid rgba(255,255,255,0.05)',
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontSize: 12.5, fontWeight: 600 }}>{o.name} — {o.item}</div>
                                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{o.time}</div>
                                        </div>
                                        <div style={{
                                            fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                                            background: o.status === 'Selesai' ? 'rgba(74,222,128,0.1)' : o.status === 'Proses' ? 'rgba(245,197,24,0.1)' : 'rgba(96,165,250,0.1)',
                                            color: o.status === 'Selesai' ? '#4ade80' : o.status === 'Proses' ? '#fbbf24' : '#60a5fa',
                                        }}>
                                            {o.status}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        {/* Right: info */}
                        <div style={{ width: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Tag label="Kuliner / F&B" />
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 900, color: '#fbbf24', marginBottom: 4 }}>+5× Pesanan</div>
                                <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>Dapur Mama</h3>
                                <p style={{ fontSize: 12.5, color: 'var(--white-60)', lineHeight: 1.6 }}>
                                    Dari jualan offline → pesanan online tiap hari via website.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ══ CARD 3: Coach Sari — leads counter ══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }}
                        onClick={() => handleWA('Coach Sari')}
                        style={{
                            background: 'linear-gradient(145deg, rgba(139,92,246,0.1) 0%, var(--bg-card) 60%)',
                            border: '1px solid rgba(139,92,246,0.2)',
                            borderRadius: 20, padding: '22px 24px',
                            cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                        }}
                        whileHover={{ borderColor: 'rgba(139,92,246,0.4)', boxShadow: '0 0 32px rgba(139,92,246,0.07)' }}
                    >
                        {/* Leads counter visual */}
                        <div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 10, fontFamily: 'monospace' }}>
                                📈 Leads Organik — 90 hari
                            </div>
                            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
                                <MiniBar values={[20, 30, 25, 40, 50, 45, 65, 70, 80, 90, 100, 95]} color="#a78bfa" />
                            </div>
                        </div>
                        <div>
                            <Tag label="Personal Brand" color="rgba(139,92,246,0.12)" text="#a78bfa" />
                            <h3 style={{ fontSize: 17, fontWeight: 800, margin: '8px 0 6px' }}>Coach Sari</h3>
                            <p style={{ fontSize: 13, color: 'var(--white-60)', lineHeight: 1.6 }}>
                                Leads organik naik +200% — klien coaching terus bertambah.
                            </p>
                        </div>
                    </motion.div>

                    {/* ══ CARD 4: Doni Creative — design palette visual ══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.16 }}
                        onClick={() => handleWA('Doni Creative')}
                        style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '22px 22px',
                            cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                            overflow: 'hidden', position: 'relative',
                        }}
                        whileHover={{ borderColor: 'rgba(245,197,24,0.25)' }}
                    >
                        {/* Design tool palette mockup */}
                        <div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 10, fontFamily: 'monospace' }}>
                                🎨 Brand Palette
                            </div>
                            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                                {['#1a1a2e', '#4c1d95', '#7c3aed', '#a78bfa', '#f5c518', '#f0fdf4'].map((c, i) => (
                                    <motion.div key={i}
                                        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                                        viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.06, type: 'spring' }}
                                        style={{
                                            width: 28, height: 28, borderRadius: 8, background: c,
                                            border: '1px solid rgba(255,255,255,0.08)', flexShrink: 0,
                                        }}
                                    />
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                                {['Inter', 'Playfair', 'Mono'].map((f, i) => (
                                    <div key={i} style={{
                                        padding: '3px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
                                        fontSize: 10, color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.04)',
                                    }}>
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Tag label="Studio Desain" />
                            <h3 style={{ fontSize: 16, fontWeight: 800, margin: '8px 0 5px' }}>Doni Creative</h3>
                            <p style={{ fontSize: 12, color: 'var(--white-60)', lineHeight: 1.6 }}>8× klien premium dari Google Organic.</p>
                        </div>
                    </motion.div>

                    {/* ══ CARD 5: Griya Makmur — lead form mockup ══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2 }}
                        onClick={() => handleWA('Griya Makmur')}
                        style={{
                            background: 'linear-gradient(145deg, rgba(16,185,129,0.08) 0%, var(--bg-card) 60%)',
                            border: '1px solid rgba(16,185,129,0.2)',
                            borderRadius: 20, padding: '20px 22px',
                            cursor: 'pointer', display: 'flex', gap: 20, overflow: 'hidden',
                        }}
                        whileHover={{ borderColor: 'rgba(16,185,129,0.4)' }}
                    >
                        {/* Mini form mockup */}
                        <div style={{
                            background: 'rgba(0,0,0,0.35)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)',
                            padding: '12px 14px', minWidth: 160, fontSize: 11,
                        }}>
                            <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 8, fontFamily: 'monospace' }}>🏡 Cek Properti</div>
                            {['Nama Lengkap', 'No. WhatsApp', 'Budget'].map((f, i) => (
                                <div key={i} style={{
                                    marginBottom: 6, height: 22, borderRadius: 6,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(16,185,129,0.15)',
                                    padding: '0 8px', display: 'flex', alignItems: 'center',
                                    fontSize: 10, color: 'rgba(255,255,255,0.2)',
                                }}>
                                    {f}
                                </div>
                            ))}
                            <div style={{
                                marginTop: 8, background: 'rgba(16,185,129,0.25)',
                                border: '1px solid rgba(16,185,129,0.4)',
                                borderRadius: 6, padding: '6px', textAlign: 'center',
                                fontSize: 11, fontWeight: 700, color: '#4ade80',
                            }}>
                                Kirim →
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Tag label="Properti" color="rgba(16,185,129,0.12)" text="#34d399" />
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 5 }}>Griya Makmur</h3>
                                <p style={{ fontSize: 12.5, color: 'var(--white-60)', lineHeight: 1.6 }}>
                                    40+ leads/bulan masuk via form — tanpa biaya iklan.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ══ CARD 6: Batik Nusantara — WIDE with export countries ══ */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.24 }}
                        onClick={() => handleWA('Batik Nusantara')}
                        style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: '22px 28px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 32, overflow: 'hidden',
                        }}
                        whileHover={{ borderColor: 'rgba(245,197,24,0.25)' }}
                    >
                        {/* Left info */}
                        <div style={{ minWidth: 200 }}>
                            <Tag label="Fashion / UMKM" />
                            <h3 style={{ fontSize: 20, fontWeight: 800, margin: '10px 0 6px' }}>Batik Nusantara</h3>
                            <p style={{ fontSize: 13, color: 'var(--white-60)', lineHeight: 1.6 }}>
                                UMKM lokal tembus pasar internasional — website jadi jembatannya.
                            </p>
                            <div style={{ marginTop: 12 }}>
                                <div style={{ fontSize: 28, fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>6×</div>
                                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Ekspor ke luar negeri</div>
                            </div>
                        </div>

                        {/* Country flag export destinations */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 10, fontFamily: 'monospace' }}>
                                🌏 Ekspor ke — 6 negara
                            </div>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                {[
                                    { flag: '🇸🇬', name: 'Singapura' },
                                    { flag: '🇲🇾', name: 'Malaysia' },
                                    { flag: '🇦🇺', name: 'Australia' },
                                    { flag: '🇯🇵', name: 'Jepang' },
                                    { flag: '🇦🇪', name: 'UAE' },
                                    { flag: '🇺🇸', name: 'USA' },
                                ].map((c, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07 }}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 6,
                                            padding: '6px 12px', borderRadius: 10,
                                            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                                        }}
                                    >
                                        <span style={{ fontSize: 18 }}>{c.flag}</span>
                                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{c.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
