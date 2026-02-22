import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Clock, BadgeCheck, Phone } from 'lucide-react';

export default function CTA() {
    const handleWA = () => {
        const msg = encodeURIComponent('Halo Bang Bisnis! Saya siap mulai bikin website. Bisa konsultasi?');
        window.open(`https://wa.me/6287701785344?text=${msg}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <section style={{ background: 'var(--bg)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="cta-card"
                    style={{
                        background: 'linear-gradient(135deg, rgba(245,197,24,0.1) 0%, rgba(245,197,24,0.02) 50%, rgba(139,92,246,0.05) 100%)',
                        border: '1px solid rgba(245,197,24,0.2)',
                        position: 'relative',
                        overflow: 'hidden',
                        textAlign: 'center',
                    }}
                >
                    {/* Decorative orbs */}
                    <div style={{
                        position: 'absolute', top: -80, left: -80, width: 320, height: 320, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(245,197,24,0.08) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: -80, right: -80, width: 280, height: 280, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Content */}
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        {/* Label pill */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '7px 20px', borderRadius: 99, marginBottom: 28,
                            background: 'rgba(245,197,24,0.12)', border: '1px solid rgba(245,197,24,0.28)',
                            fontSize: 13, fontWeight: 700, color: 'var(--accent)',
                        }}>
                            🚀 Yuk, Mulai Sekarang
                        </div>

                        <h2 style={{
                            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                            fontWeight: 800, lineHeight: 1.15, marginBottom: 20,
                        }}>
                            Bisnis Kamu Butuh Website<br />
                            yang <em className="font-serif text-gradient" style={{ fontWeight: 700 }}>Benar-benar Bekerja</em>
                        </h2>

                        <p style={{
                            fontSize: 16, color: 'var(--white-60)',
                            maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.8,
                        }}>
                            Konsultasi pertama <strong style={{ color: 'var(--white)' }}>100% gratis</strong>. Ceritakan bisnismu dan kami rekomendasikan solusi website terbaik.
                        </p>

                        {/* Buttons */}
                        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
                            <button className="btn-primary" onClick={handleWA} style={{ fontSize: 16, padding: '16px 32px' }}>
                                <MessageSquare size={18} />
                                Chat WhatsApp Sekarang
                            </button>
                            <a href="#harga" className="btn-secondary" style={{ fontSize: 16, padding: '16px 32px' }}>
                                Lihat Harga
                                <ArrowRight size={18} />
                            </a>
                        </div>

                        {/* Trust signals as cards */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                            {[
                                { icon: <Clock size={14} />, text: 'Respon < 1 jam' },
                                { icon: <BadgeCheck size={14} />, text: 'Tanpa komitmen' },
                                { icon: <Phone size={14} />, text: 'Gratis konsultasi' },
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 7,
                                    padding: '8px 16px', borderRadius: 99,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    fontSize: 13, color: 'var(--white-60)',
                                }}>
                                    <span style={{ color: 'var(--accent)' }}>{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
