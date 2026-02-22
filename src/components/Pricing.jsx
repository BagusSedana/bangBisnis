import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, ArrowRight, Zap } from 'lucide-react';

const handleWA = (plan) => {
    const msg = encodeURIComponent(`Halo Bang Bisnis! Saya tertarik dengan paket ${plan}. Bisa info lebih lanjut?`);
    window.open(`https://wa.me/6287701785344?text=${msg}`, '_blank', 'noopener,noreferrer');
};

const features = [
    { label: 'Landing page', starter: '1 halaman', growth: 'Multi-section', pro: 'Website multi-halaman' },
    { label: 'Desain premium', starter: true, growth: true, pro: true },
    { label: 'Animasi & micro-interaction', starter: false, growth: true, pro: true },
    { label: 'Mobile responsive', starter: true, growth: true, pro: true },
    { label: 'Form kontak / WhatsApp CTA', starter: true, growth: true, pro: true },
    { label: 'Google Analytics', starter: false, growth: true, pro: true },
    { label: 'SEO Dasar (meta, schema)', starter: false, growth: true, pro: true },
    { label: 'Domain custom gratis 1 tahun', starter: false, growth: true, pro: true },
    { label: 'Blog / CMS', starter: false, growth: 'Sederhana', pro: 'Lengkap' },
    { label: 'Admin panel', starter: false, growth: false, pro: true },
    { label: 'Hosting premium 1 tahun', starter: false, growth: false, pro: true },
    { label: 'Revisi gratis', starter: '1×', growth: '3×', pro: 'Unlimited' },
    { label: 'Support setelah live', starter: false, growth: false, pro: '30 hari' },
];

const planMeta = {
    starter: {
        bestFor: 'UMKM & personal brand baru',
        stat: '6', statLabel: 'fitur termasuk',
        highlight: 'Paling cepat live — bisa dalam 1 hari kerja',
    },
    growth: {
        bestFor: 'Bisnis yang butuh lebih banyak leads',
        stat: '7+', statLabel: 'fitur + domain + blog',
        highlight: 'Pilihan paling populer di antara semua klien kami',
    },
    pro: {
        bestFor: 'Bisnis yang kelola konten mandiri',
        stat: '13', statLabel: 'fitur lengkap',
        highlight: 'Kelola artikel & portofolio sendiri tanpa coding',
    },
};

function Cell({ value }) {
    if (value === true) return <Check size={16} style={{ color: '#4ade80' }} />;
    if (value === false) return <X size={14} style={{ color: 'rgba(255,255,255,0.18)' }} />;
    return <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--white-80)' }}>{value}</span>;
}

const plans = [
    {
        key: 'starter',
        name: 'Starter',
        price: 'Rp 300.000',
        desc: 'Untuk UMKM yang baru mau hadir online.',
        tag: null,
        accentColor: 'rgba(255,255,255,0.7)',
        color: 'rgba(255,255,255,0.03)',
        border: 'rgba(255,255,255,0.08)',
        btnLabel: 'Mulai Sekarang',
        btnClass: 'btn-secondary',
    },
    {
        key: 'growth',
        name: 'Growth',
        price: 'Rp 750.000',
        desc: 'Untuk bisnis serius yang ingin leads lebih banyak.',
        tag: 'PALING POPULER',
        accentColor: 'var(--accent)',
        color: 'linear-gradient(160deg, rgba(245,197,24,0.12) 0%, rgba(245,197,24,0.04) 100%)',
        border: 'rgba(245,197,24,0.35)',
        btnLabel: '🔥 Pilih Growth',
        btnClass: 'btn-primary',
    },
    {
        key: 'pro',
        name: 'Pro',
        price: 'Rp 1.500.000',
        desc: 'Website bisnis lengkap dengan admin panel.',
        tag: null,
        accentColor: '#a78bfa',
        color: 'linear-gradient(160deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 100%)',
        border: 'rgba(139,92,246,0.22)',
        btnLabel: 'Hubungi Kami',
        btnClass: 'btn-secondary',
    },
];

export default function Pricing() {
    const [hovered, setHovered] = useState(null);

    return (
        <section className="section" id="harga" style={{ background: 'var(--bg)' }}>
            <div className="container">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ marginBottom: 40 }}
                >
                    <div className="section-label"><Sparkles size={13} /> Harga Transparan</div>
                    <div className="section-header-row" style={{ marginBottom: 0 }}>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>
                            Investasi yang <em className="font-serif text-gradient" style={{ fontStyle: 'italic', fontWeight: 600 }}>Menghasilkan</em>
                        </h2>
                        <p style={{ maxWidth: 380, color: 'var(--white-60)', fontSize: 15, lineHeight: 1.7 }}>
                            Tidak ada biaya tersembunyi. Pilih paket yang sesuai.
                        </p>
                    </div>
                </motion.div>

                {/* Plan cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    className="pricing-cards-grid"
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.key}
                            onHoverStart={() => setHovered(plan.key)}
                            onHoverEnd={() => setHovered(null)}
                            style={{
                                background: plan.color,
                                border: `1px solid ${plan.border}`,
                                borderRadius: 20,
                                padding: '28px 28px 24px',
                                position: 'relative',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'box-shadow 0.3s',
                                boxShadow: hovered === plan.key
                                    ? (plan.key === 'growth'
                                        ? '0 0 56px rgba(245,197,24,0.14)'
                                        : plan.key === 'pro'
                                            ? '0 0 48px rgba(139,92,246,0.1)'
                                            : '0 20px 48px rgba(0,0,0,0.3)')
                                    : 'none',
                            }}
                            onClick={() => handleWA(plan.name)}
                        >
                            {plan.tag && (
                                <div style={{
                                    position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
                                    background: 'var(--accent)', color: '#000',
                                    padding: '4px 16px', borderRadius: 99,
                                    fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap', letterSpacing: '0.5px',
                                }}>
                                    {plan.tag}
                                </div>
                            )}

                            {/* Plan name */}
                            <div style={{ fontSize: 11, color: plan.accentColor, marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>
                                {plan.name}
                            </div>

                            {/* Price */}
                            <div style={{ fontSize: plan.key === 'growth' ? '2.4rem' : '2rem', fontWeight: 900, color: plan.accentColor, lineHeight: 1, marginBottom: 4 }}>
                                {plan.price}
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--white-60)', marginBottom: 8 }}>sekali bayar</div>
                            <p style={{ fontSize: 13.5, color: 'var(--white-60)', lineHeight: 1.55, marginBottom: 20 }}>{plan.desc}</p>

                            {/* Divider */}
                            <div style={{ height: 1, background: `${plan.accentColor}22`, marginBottom: 18 }} />

                            {/* Unique value — NOT repeated in the comparison table */}
                            <div style={{ flex: 1, marginBottom: 24 }}>
                                <div style={{ fontSize: 11, color: 'var(--white-60)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>
                                    Cocok untuk
                                </div>
                                <div style={{ fontSize: 14, color: 'var(--white-80)', fontWeight: 500, marginBottom: 18, lineHeight: 1.5 }}>
                                    {planMeta[plan.key].bestFor}
                                </div>
                                {/* Stat widget */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '12px 16px', borderRadius: 12,
                                    background: `${plan.accentColor}0d`,
                                    border: `1px solid ${plan.accentColor}22`,
                                }}>
                                    <div>
                                        <div style={{ fontSize: '1.7rem', fontWeight: 900, color: plan.accentColor, lineHeight: 1 }}>
                                            {planMeta[plan.key].stat}
                                        </div>
                                        <div style={{ fontSize: 10, color: 'var(--white-60)', marginTop: 2 }}>
                                            {planMeta[plan.key].statLabel}
                                        </div>
                                    </div>
                                    <div style={{ height: 36, width: 1, background: `${plan.accentColor}22` }} />
                                    <div style={{ fontSize: 12, color: 'var(--white-60)', lineHeight: 1.55, flex: 1 }}>
                                        {planMeta[plan.key].highlight}
                                    </div>
                                </div>
                            </div>



                            <button
                                onClick={(e) => { e.stopPropagation(); handleWA(plan.name); }}
                                className={plan.btnClass}
                                style={{
                                    width: '100%', justifyContent: 'center', fontSize: 13.5,
                                    ...(plan.key === 'pro' ? { borderColor: 'rgba(139,92,246,0.4)', color: '#a78bfa' } : {}),
                                }}
                            >
                                {plan.btnLabel}
                                <ArrowRight size={14} />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Feature comparison table — horizontal scroll on mobile */}
                <div className="pricing-table-wrap" style={{ marginBottom: 12 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            borderRadius: 20,
                            overflow: 'hidden',
                            minWidth: 580,
                        }}
                    >
                        {/* Table header */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ padding: '14px 20px', fontSize: 12, color: 'var(--white-60)', fontWeight: 600 }}>Fitur</div>
                            {[{ n: 'Starter', c: 'rgba(255,255,255,0.7)' }, { n: 'Growth', c: 'var(--accent)' }, { n: 'Pro', c: '#a78bfa' }].map((h, i) => (
                                <div key={i} style={{
                                    padding: '14px 16px', textAlign: 'center',
                                    fontSize: 13, fontWeight: 700, color: h.c,
                                    background: h.n === 'Growth' ? 'rgba(245,197,24,0.05)' : h.n === 'Pro' ? 'rgba(139,92,246,0.04)' : 'transparent',
                                    borderLeft: '1px solid var(--border)',
                                }}>
                                    {h.n}
                                </div>
                            ))}
                        </div>
                        {features.map((f, idx) => (
                            <div key={idx} style={{
                                display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
                                borderBottom: idx < features.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                            }}>
                                <div style={{ padding: '11px 20px', fontSize: 13, color: 'var(--white-80)' }}>{f.label}</div>
                                {[f.starter, f.growth, f.pro].map((val, j) => (
                                    <div key={j} style={{
                                        padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        borderLeft: '1px solid var(--border)',
                                        background: j === 1 ? 'rgba(245,197,24,0.03)' : j === 2 ? 'rgba(139,92,246,0.02)' : 'transparent',
                                    }}>
                                        <Cell value={val} />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>{/* /pricing-table-wrap */}

                {/* Maintenance add-on */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}
                    style={{
                        background: 'linear-gradient(90deg, rgba(245,197,24,0.07) 0%, rgba(245,197,24,0.02) 100%)',
                        border: '1px solid rgba(245,197,24,0.2)',
                        borderRadius: 16,
                        padding: '20px 28px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: 'rgba(245,197,24,0.12)', border: '1px solid rgba(245,197,24,0.25)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                        }}>
                            <Zap size={18} />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>Add-on: Maintenance Bulanan</div>
                            <div style={{ color: 'var(--white-60)', fontSize: 13 }}>
                                Update konten, revisi ringan, monitoring uptime — tenang urusan teknis.
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div>
                            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent)' }}>Rp 200.000</span>
                            <span style={{ color: 'var(--white-60)', fontSize: 12 }}> /bulan</span>
                        </div>
                        <button onClick={() => handleWA('Maintenance')} className="btn-primary" style={{ fontSize: 13, padding: '10px 20px' }}>
                            Tambah Paket
                        </button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
