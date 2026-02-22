import React from 'react';
import { Zap, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
    'Layanan': [
        { label: 'Landing Page', href: '#layanan' },
        { label: 'Website Bisnis', href: '#layanan' },
        { label: 'Maintenance', href: '#harga' },
        { label: 'Optimasi SEO', href: '#layanan' },
    ],
    'Informasi': [
        { label: 'Proses Kerja', href: '#proses' },
        { label: 'Portofolio', href: '#portofolio' },
        { label: 'Testimoni', href: '#testimoni' },
        { label: 'FAQ', href: '#faq' },
    ],
    'Harga': [
        { label: 'Paket Starter', href: '#harga' },
        { label: 'Paket Growth', href: '#harga' },
        { label: 'Paket Pro', href: '#harga' },
        { label: 'Maintenance', href: '#harga' },
    ],
};

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--bg-2)',
            borderTop: '1px solid var(--border)',
            padding: '60px 0 32px',
        }}>
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                            <div style={{
                                width: 32, height: 32, background: 'var(--accent)',
                                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Zap size={18} color="#000" fill="#000" />
                            </div>
                            <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--white)' }}>
                                Bang<span style={{ color: 'var(--accent)' }}>Bisnis</span>
                            </span>
                        </div>

                        <p style={{ fontSize: 14, color: 'var(--white-60)', lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
                            Jasa pembuatan landing page & website profesional untuk bisnis Indonesia. Desain modern, harga terjangkau, hasil nyata.
                        </p>

                        {/* Social links (no email/phone exposed) */}
                        <div style={{ display: 'flex', gap: 12 }}>
                            <a
                                href="https://www.instagram.com/bgsedana/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: 38, height: 38, borderRadius: 10,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--white-60)',
                                    transition: 'all 0.2s',
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--white-60)'; }}
                            >
                                <Instagram size={16} />
                            </a>
                            <a
                                href="https://www.tiktok.com/@bangbisnisofficial"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: 38, height: 38, borderRadius: 10,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--white-60)',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                    fontWeight: 700, fontSize: 14,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--white-60)'; }}
                            >
                                TT
                            </a>
                            <button
                                onClick={() => window.open(`https://wa.me/6287701785344`, '_blank', 'noopener,noreferrer')}
                                style={{
                                    width: 38, height: 38, borderRadius: 10,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--white-60)', cursor: 'pointer',
                                    transition: 'all 0.2s', fontSize: 14,
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.15)'; e.currentTarget.style.color = '#25D366'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--white-60)'; }}
                            >
                                WA
                            </button>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 style={{ fontSize: 13, fontWeight: 600, color: 'var(--white)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {category}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {links.map(link => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        style={{ fontSize: 14, color: 'var(--white-60)', textDecoration: 'none', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.target.style.color = 'var(--white)'}
                                        onMouseLeave={e => e.target.style.color = 'var(--white-60)'}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: 24,
                    display: 'flex', flexWrap: 'wrap',
                    justifyContent: 'space-between', alignItems: 'center',
                    gap: 12,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <p style={{ fontSize: 13, color: 'var(--white-60)' }}>
                            © 2025 BangBisnis. Dibuat dengan ❤️ di Indonesia.
                        </p>
                        {/* Seedbacklink Verification Badge */}
                        <a href="https://id.seedbacklink.com/" target="_blank" rel="noopener noreferrer">
                            <img title="seedbacklink" src="https://id.seedbacklink.com/wp-content/uploads/2025/04/badge-seedbacklink-media.png" alt="seedbacklink" style={{ height: 24, width: 'auto', display: 'block', opacity: 0.7 }} />
                        </a>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--white-60)' }}>
                        Privasi terjaga — kami tidak menjual data kamu.
                    </p>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </footer>
    );
}
