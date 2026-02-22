import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Rina Maharani', role: 'Pemilik Toko Kue Online', avatar: 'RM',
        text: 'Sebelumnya cuma jualan lewat IG. Setelah punya landing page dari Bang Bisnis, pesanan masuk tiap hari bahkan dari pelanggan baru yang nemu di Google. Recommended banget!',
    },
    {
        name: 'Doni Kurniawan', role: 'Freelancer Desainer Grafis', avatar: 'DK',
        text: 'Proses cepat banget, 3 hari sudah jadi. Desainnya keren, mobile friendly. Klien baru mulai hubungi saya lewat website. Worth it!',
    },
    {
        name: 'Sari Wijayanti', role: 'Coach Bisnis Online', avatar: 'SW',
        text: 'Landing page untuk program coaching saya sekarang jauh lebih profesional. Konversi dari iklan Meta meningkat signifikan setelah pakai ini.',
    },
    {
        name: 'Hendra Santoso', role: 'Pengusaha Kuliner', avatar: 'HS',
        text: 'Awalnya ragu karena harga murah, takut hasilnya biasa aja. Ternyata hasilnya melebihi ekspektasi! Respon timnya juga cepat dan ramah.',
    },
    {
        name: 'Maya Putri', role: 'Seller Skincare', avatar: 'MP',
        text: 'ROAS iklan naik dari 2x jadi 5x setelah pakai landing page baru. Bang Bisnis bantu bikin halaman yang cantik dan persuasif banget.',
    },
    {
        name: 'Budi Prasetyo', role: 'Konsultan Properti', avatar: 'BP',
        text: 'Website saya sekarang muncul di Google dan leads masuk organik tanpa iklan. Investasi yang tepat untuk bisnis properti saya.',
    },
    {
        name: 'Lestari Dewi', role: 'Guru Les Privat', avatar: 'LD',
        text: 'Murid-murid baru mulai DM saya setelah website jalan. Dulu susah dapat murid, sekarang bahkan nolak karena penuh. Makasih Bang Bisnis!',
    },
    {
        name: 'Rizki Ramadan', role: 'Dropshipper Online', avatar: 'RR',
        text: 'Checkout rate naik drastis setelah punya landing page yang proper. Tim Bang Bisnis bantu optimasi copy-nya juga. Mantap!',
    },
];

const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
const row2 = [...testimonials.slice(4), ...testimonials.slice(4)];

const TestiCard = ({ t }) => (
    <div style={{
        minWidth: 300, maxWidth: 300,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 18,
        padding: '22px 24px',
        flexShrink: 0,
    }}>
        {/* Quote mark instead of stars */}
        <div style={{ marginBottom: 14, color: 'rgba(245,197,24,0.35)' }}>
            <Quote size={20} />
        </div>
        <p style={{ fontSize: 14, color: 'var(--white-80)', lineHeight: 1.75, marginBottom: 18 }}>
            {t.text}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(245,197,24,0.4), rgba(245,197,24,0.15))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 12, color: '#000', flexShrink: 0,
                border: '1px solid rgba(245,197,24,0.2)',
            }}>
                {t.avatar}
            </div>
            <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--white-60)' }}>{t.role}</div>
            </div>
        </div>
    </div>
);

export default function Testimonials() {
    return (
        <section className="section" id="testimoni" style={{ background: 'var(--bg)', overflow: 'hidden' }}>
            <div className="container" style={{ marginBottom: 52 }}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center' }}
                >
                    <div className="section-label" style={{ justifyContent: 'center' }}>
                        Testimoni
                    </div>
                    <h2 className="section-title" style={{ maxWidth: 520, margin: '0 auto 16px' }}>
                        Bisnis Nyata,<br />Hasil yang <em className="font-serif text-gradient" style={{ fontWeight: 600, fontStyle: 'italic' }}>Bisa Dibuktikan</em>
                    </h2>
                    <p style={{ color: 'var(--white-60)', fontSize: 16 }}>
                        Lebih dari 50+ bisnis sudah mempercayai kami. Ini cerita mereka.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Row 1 — scroll left */}
            <div style={{ marginBottom: 16 }}>
                <div style={{
                    display: 'flex', gap: 16, overflow: 'hidden',
                    maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
                }}>
                    <motion.div
                        style={{ display: 'flex', gap: 16 }}
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                    >
                        {row1.map((t, i) => <TestiCard key={i} t={t} />)}
                    </motion.div>
                </div>
            </div>

            {/* Marquee Row 2 — scroll right */}
            <div>
                <div style={{
                    display: 'flex', gap: 16, overflow: 'hidden',
                    maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
                }}>
                    <motion.div
                        style={{ display: 'flex', gap: 16 }}
                        animate={{ x: ['-50%', '0%'] }}
                        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                    >
                        {row2.map((t, i) => <TestiCard key={i} t={t} />)}
                    </motion.div>
                </div>
            </div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ display: 'flex', justifyContent: 'center', gap: 64, marginTop: 52, flexWrap: 'wrap' }}
            >
                {[
                    { num: '50+', label: 'Proyek Selesai' },
                    { num: '4.9/5', label: 'Rating Rata-rata' },
                    { num: '100%', label: 'Klien Puas' },
                ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{s.num}</div>
                        <div style={{ fontSize: 13, color: 'var(--white-60)', marginTop: 4 }}>{s.label}</div>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
