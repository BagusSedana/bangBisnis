import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { href: '#layanan', label: 'Layanan' },
    { href: '#proses', label: 'Proses' },
    { href: '#portofolio', label: 'Portofolio' },
    { href: '#harga', label: 'Harga' },
    { href: '/blog', label: 'Artikel', isRoute: true },
    { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    // If on non-landing page, make anchor links go to /#section
    const resolveHref = (href, isRoute) => {
        if (isRoute) return href;
        return isHome ? href : '/' + href;
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleWA = () => {
        const msg = encodeURIComponent('Halo! Saya mau tanya tentang jasa landing page.');
        window.open(`https://wa.me/6287701785344?text=${msg}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <div className="container" style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '16px 24px',
                    maxWidth: 1280, margin: '0 auto',
                }}>
                    {/* Logo */}
                    <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                            width: 32, height: 32, background: 'var(--accent)',
                            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Zap size={18} color="#000" fill="#000" />
                        </div>
                        <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--white)', letterSpacing: '-0.3px' }}>
                            Bang<span style={{ color: 'var(--accent)' }}>Bisnis</span>
                        </span>
                    </a>

                    {/* Desktop links */}
                    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
                        {navLinks.map(({ href, label, isRoute }) => isRoute ? (
                            <Link key={href} to={href} style={{
                                color: 'var(--white-60)', fontSize: 14, fontWeight: 500,
                                textDecoration: 'none', transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.target.style.color = '#fff'}
                                onMouseLeave={e => e.target.style.color = 'var(--white-60)'}
                            >
                                {label}
                            </Link>
                        ) : (
                            <a key={href} href={resolveHref(href)} style={{
                                color: 'var(--white-60)', fontSize: 14, fontWeight: 500,
                                textDecoration: 'none', transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.target.style.color = '#fff'}
                                onMouseLeave={e => e.target.style.color = 'var(--white-60)'}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button onClick={handleWA} className="btn-primary" style={{ fontSize: 13, padding: '10px 20px' }}>
                            Hubungi Kami
                        </button>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setOpen(!open)}
                            style={{
                                background: 'none', border: '1px solid var(--border)',
                                color: 'var(--white)', padding: 8, borderRadius: 8,
                                cursor: 'pointer', display: 'none',
                            }}
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{
                                background: 'rgba(7,6,18,0.97)',
                                backdropFilter: 'blur(20px)',
                                borderTop: '1px solid var(--border)',
                                padding: '20px 24px',
                                display: 'flex', flexDirection: 'column', gap: 4,
                            }}
                        >
                            {navLinks.map(({ href, label, isRoute }) => isRoute ? (
                                <Link
                                    key={href} to={href}
                                    onClick={() => setOpen(false)}
                                    style={{
                                        color: 'var(--white-80)', fontSize: 16, fontWeight: 500,
                                        textDecoration: 'none', padding: '12px 0',
                                        borderBottom: '1px solid var(--border)',
                                        display: 'block',
                                    }}
                                >
                                    {label}
                                </Link>
                            ) : (
                                <a
                                    key={href} href={resolveHref(href)}
                                    onClick={() => setOpen(false)}
                                    style={{
                                        color: 'var(--white-80)', fontSize: 16, fontWeight: 500,
                                        textDecoration: 'none', padding: '12px 0',
                                        borderBottom: '1px solid var(--border)',
                                    }}
                                >
                                    {label}
                                </a>
                            ))}
                            <button onClick={handleWA} className="btn-primary" style={{ marginTop: 16, justifyContent: 'center' }}>
                                Konsultasi Gratis
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </>
    );
}
