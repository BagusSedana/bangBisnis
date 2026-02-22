import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hls from 'hls.js';
import { Sparkles, ArrowRight, Phone } from 'lucide-react';

const HLS_URL = 'https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8';

// BlurIn animation wrapper
const BlurIn = ({ children, delay = 0, duration = 0.6, y = 20 }) => (
    <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)', y }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
        {children}
    </motion.div>
);

// Split text animation by words
const SplitText = ({ text, className = '', baseDelay = 0 }) => {
    const words = text.split(' ');
    return (
        <span className={className} style={{ display: 'inline' }}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                        duration: 0.6,
                        delay: baseDelay + i * 0.08,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    style={{ display: 'inline-block', marginRight: '0.25em' }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

export default function Hero() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls({ startLevel: -1, autoLevelEnabled: true });
            hls.loadSource(HLS_URL);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(() => { });
            });
            return () => hls.destroy();
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = HLS_URL;
            video.play().catch(() => { });
        }
    }, []);

    const openWhatsApp = () => {
        const msg = encodeURIComponent('Halo Bang Bisnis! Saya tertarik dengan jasa landing page. Bisa konsultasi gratis?');
        window.open(`https://wa.me/6287701785344?text=${msg}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <section
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                minHeight: '680px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg)',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="hero-video"
                style={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                    opacity: 0.7,
                }}
            />

            {/* Gradient overlays */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'radial-gradient(circle at center, rgba(7,6,18,0.3) 0%, rgba(7,6,18,0.7) 100%)',
            }} />
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', zIndex: 10,
                background: 'linear-gradient(to bottom, transparent, #070612)',
            }} />

            {/* Glow orbs */}
            <div className="glow-orb animate-pulse-glow" style={{
                width: 400, height: 400, top: '10%', left: '-5%',
                background: 'rgba(245,197,24,0.06)',
                zIndex: 1,
            }} />

            {/* Content */}
            <div className="container" style={{ position: 'relative', zIndex: 20 }}>
                <div style={{ maxWidth: 640 }}>

                    {/* Badge */}
                    <BlurIn delay={0} duration={0.6}>
                        <div className="badge" style={{ marginBottom: 28 }}>
                            <Sparkles size={12} style={{ color: 'var(--accent)' }} />
                            <span>Jasa Landing Page Profesional 🇮🇩</span>
                        </div>
                    </BlurIn>

                    {/* Heading */}
                    <h1 style={{
                        fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                        fontWeight: 700,
                        lineHeight: 1.15,
                        marginBottom: 24,
                    }}>
                        <span style={{ display: 'block' }}>
                            <SplitText text="Wujudkan Bisnis" baseDelay={0.1} />
                        </span>
                        <span style={{ display: 'block' }}>
                            <SplitText text="Kamu Jadi" baseDelay={0.26} />
                            {' '}
                            <em className="font-serif text-gradient" style={{ fontWeight: 600 }}>
                                <SplitText text="Digital." baseDelay={0.4} />
                            </em>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <BlurIn delay={0.5} duration={0.6}>
                        <p style={{
                            fontSize: '1.05rem',
                            color: 'var(--white-80)',
                            lineHeight: 1.8,
                            maxWidth: 520,
                            marginBottom: 40,
                            fontWeight: 400,
                        }}>
                            Landing page & website profesional yang dirancang untuk <strong style={{ color: 'var(--accent)', fontWeight: 700 }}>menghasilkan leads</strong> dan meningkatkan penjualan bisnis kamu — cepat, modern, dan dioptimalkan untuk konversi.
                        </p>
                    </BlurIn>

                    {/* CTA Buttons */}
                    <BlurIn delay={0.65} duration={0.6}>
                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                            <button className="btn-primary" onClick={openWhatsApp}>
                                <Phone size={16} />
                                Konsultasi Gratis
                            </button>
                            <a href="#layanan" className="btn-secondary">
                                Lihat Layanan
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </BlurIn>

                    {/* Social proof mini */}
                    <BlurIn delay={0.8} duration={0.6}>
                        <div style={{
                            marginTop: 48,
                            display: 'flex',
                            gap: 32,
                            flexWrap: 'wrap',
                        }}>
                            {[
                                { num: '50+', label: 'Klien Puas' },
                                { num: '100%', label: 'On-Time Delivery' },
                                { num: '3 Hari', label: 'Rata-rata Selesai' },
                            ].map((s, i) => (
                                <div key={i} className="stat-item">
                                    <div className="stat-number">{s.num}</div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </BlurIn>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}
            >
                <div style={{
                    width: 24, height: 38, border: '1.5px solid rgba(255,255,255,0.2)',
                    borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6,
                }}>
                    <div style={{
                        width: 3, height: 8, background: 'var(--white-60)', borderRadius: 2,
                    }} />
                </div>
            </motion.div>
        </section>
    );
}
