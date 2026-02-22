import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        num: '01',
        q: 'Berapa lama waktu pengerjaan?',
        a: 'Untuk landing page (Starter & Growth), biasanya 1–3 hari kerja. Paket Pro dengan multi-halaman membutuhkan 5–7 hari. Waktu bisa lebih cepat tergantung seberapa cepat kamu kirim materi konten.',
        tag: 'Waktu',
    },
    {
        num: '02',
        q: 'Apakah saya perlu menyediakan teks dan foto?',
        a: 'Idealnya kamu siapkan teks bisnismu. Tapi kami bisa bantu menyusun copywriting dasar. Untuk foto, bisa pakai dari Unsplash (gratis) atau foto produk sendiri.',
        tag: 'Konten',
    },
    {
        num: '03',
        q: 'Apakah website bisa diupdate sendiri?',
        a: 'Paket Pro punya admin panel — kamu bisa update artikel dan portofolio sendiri tanpa coding. Paket Starter & Growth perlu bantuan kami, yang sudah termasuk di Maintenance Bulanan.',
        tag: 'Manage',
    },
    {
        num: '04',
        q: 'Hosting dan domain sudah termasuk?',
        a: 'Paket Starter pakai subdomain gratis Vercel. Paket Growth & Pro sudah termasuk domain .com atau .id custom gratis 1 tahun. Tahun berikutnya sekitar Rp 200–300 ribu/tahun.',
        tag: 'Domain',
    },
    {
        num: '05',
        q: 'Bagaimana cara pembayaran?',
        a: 'Transfer bank atau e-wallet (GoPay, OVO, DANA). Di bawah Rp 1 juta: lunas di awal. Paket Pro: DP 50% di awal, 50% saat website siap diluncurkan.',
        tag: 'Bayar',
    },
    {
        num: '06',
        q: 'Apakah ada garansi revisi?',
        a: 'Ya! 1× revisi (Starter), 3× (Growth), unlimited (Pro). Revisi mencakup desain, teks, warna, atau layout. Penambahan fitur di luar scope dikenakan biaya yang disepakati bersama.',
        tag: 'Revisi',
    },
    {
        num: '07',
        q: 'Website yang dibuat apakah mobile-friendly?',
        a: '100% ya! Semua website kami desain mobile-first. Tampilan di HP mendapat prioritas utama karena 70%+ pengguna internet Indonesia akses lewat HP.',
        tag: 'Mobile',
    },
];

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <section className="section" id="faq" style={{ background: 'var(--bg)' }}>
            <div className="container">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ marginBottom: 52, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}
                >
                    <div>
                        <div className="section-label">FAQ</div>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>
                            Pertanyaan yang<br />
                            Sering <em className="font-serif text-gradient" style={{ fontStyle: 'italic', fontWeight: 600 }}>Ditanyakan</em>
                        </h2>
                    </div>
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            const msg = encodeURIComponent('Halo, saya punya pertanyaan tentang jasa Bang Bisnis.');
                            window.open(`https://wa.me/6287701785344?text=${msg}`, '_blank', 'noopener,noreferrer');
                        }}
                    >
                        Tanya via WhatsApp
                    </button>
                </motion.div>

                {/* FAQ layout: sidebar on desktop, stacked on mobile */}
                <div className="faq-layout">

                    {/* Topic pills */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="faq-topics"
                        style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                            borderRadius: 20, padding: 16,
                            display: 'flex', flexDirection: 'column',
                            gap: 8,
                            position: 'sticky', top: 90, alignSelf: 'flex-start',
                        }}
                    >
                        <div className="faq-topic-title" style={{ fontSize: 11, fontWeight: 700, color: 'var(--white-60)', letterSpacing: '1px', textTransform: 'uppercase', padding: '4px 8px', marginBottom: 4 }}>
                            Topik
                        </div>
                        {faqs.map((faq, i) => (
                            <button
                                key={i}
                                onClick={() => setOpenIdx(i)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: '10px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
                                    background: openIdx === i ? 'rgba(245,197,24,0.12)' : 'transparent',
                                    transition: 'background 0.2s',
                                    textAlign: 'left',
                                }}
                            >
                                <div style={{
                                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: openIdx === i ? 'rgba(245,197,24,0.2)' : 'rgba(255,255,255,0.05)',
                                    fontSize: 10, fontWeight: 800,
                                    color: openIdx === i ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
                                    border: openIdx === i ? '1px solid rgba(245,197,24,0.3)' : '1px solid rgba(255,255,255,0.06)',
                                }}>
                                    {faq.num}
                                </div>
                                <span style={{
                                    fontSize: 13, fontWeight: 600,
                                    color: openIdx === i ? 'var(--accent)' : 'var(--white-60)',
                                }}>
                                    {faq.tag}
                                </span>
                            </button>
                        ))}
                    </motion.div>

                    {/* Right: selected FAQ expanded + all as accordion */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                    >
                        {/* Featured active question */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={openIdx}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.35 }}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(245,197,24,0.08) 0%, var(--bg-card) 60%)',
                                    border: '1px solid rgba(245,197,24,0.25)',
                                    borderRadius: 20,
                                    padding: '28px 32px',
                                    marginBottom: 12,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                    <div style={{
                                        padding: '4px 12px', borderRadius: 99,
                                        background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)',
                                        fontSize: 11, fontWeight: 800, color: 'var(--accent)',
                                    }}>
                                        {faqs[openIdx].num}
                                    </div>
                                    <div style={{
                                        padding: '4px 12px', borderRadius: 99,
                                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                                        fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                                    }}>
                                        {faqs[openIdx].tag}
                                    </div>
                                </div>
                                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14, lineHeight: 1.3 }}>
                                    {faqs[openIdx].q}
                                </h3>
                                <p style={{ fontSize: 15, color: 'var(--white-60)', lineHeight: 1.8 }}>
                                    {faqs[openIdx].a}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Other questions as compact list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {faqs.map((faq, i) => i !== openIdx && (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                                    onClick={() => setOpenIdx(i)}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '14px 20px',
                                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                                        borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                                        transition: 'border-color 0.2s, background 0.2s',
                                    }}
                                    whileHover={{ borderColor: 'rgba(245,197,24,0.25)' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(245,197,24,0.4)' }}>{faq.num}</span>
                                        <span style={{ fontSize: 14, color: 'var(--white-80)', fontWeight: 500 }}>{faq.q}</span>
                                    </div>
                                    <ChevronDown size={16} style={{ color: 'var(--white-60)', flexShrink: 0 }} />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
