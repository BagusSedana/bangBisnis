import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowRight, TrendingUp, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ── Placeholder Ad Banner ────────────────────────────────── */
function AdBanner({ type = 'horizontal' }) {
    // Replace href with your AccessTrade affiliate link after signing up
    const adLink = 'https://accesstrade.co.id/';
    if (type === 'sidebar') {
        return (
            <a href={adLink} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #1a0a2e, #0f0d1e)',
                    border: '1px solid rgba(245,197,24,0.2)', borderRadius: 16,
                    padding: 20, textAlign: 'center', cursor: 'pointer',
                    transition: 'transform 0.2s, border-color 0.2s',
                }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(245,197,24,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(245,197,24,0.2)'; }}
                >
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 10, letterSpacing: '0.1em' }}>IKLAN</div>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#fff' }}>Cari Hosting Terpercaya?</div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 14 }}>
                        Hosting cepat, uptime 99.9%, support 24/7. Cocok untuk UMKM Indonesia.
                    </p>
                    <div style={{ padding: '8px 14px', background: '#f5c518', borderRadius: 8, color: '#000', fontSize: 12, fontWeight: 700, display: 'inline-block' }}>
                        Cek Penawaran →
                    </div>
                </div>
            </a>
        );
    }
    return (
        <a href={adLink} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(245,197,24,0.06), rgba(139,92,246,0.06))',
                border: '1px solid rgba(245,197,24,0.15)', borderRadius: 16,
                padding: '20px 24px', display: 'flex', alignItems: 'center',
                gap: 20, cursor: 'pointer', transition: 'border-color 0.2s',
            }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245,197,24,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(245,197,24,0.15)'}
            >
                <div style={{ fontSize: 36, flexShrink: 0 }}>💼</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: 4 }}>IKLAN</div>
                    <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Pasang Iklan & Cari Penghasilan Tambahan</div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                        Bergabung sebagai publisher di AccessTrade dan hasilkan komisi dari setiap klik.
                    </p>
                </div>
                <div style={{ padding: '10px 18px', background: '#f5c518', borderRadius: 10, color: '#000', fontWeight: 700, fontSize: 13, flexShrink: 0, whiteSpace: 'nowrap' }}>
                    Daftar Gratis →
                </div>
            </div>
        </a>
    );
}

/* ── Article Card ─────────────────────────────────────────── */
function ArticleCard({ article, featured = false }) {
    return (
        <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <article style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: featured ? 20 : 16,
                overflow: 'hidden', height: '100%',
                transition: 'border-color 0.2s, transform 0.2s',
                display: 'flex', flexDirection: featured ? 'row' : 'column',
            }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,197,24,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
            >
                {article.thumbnail && (
                    <div style={{ flexShrink: 0, width: featured ? '45%' : '100%', maxHeight: featured ? 'none' : 200, overflow: 'hidden' }}>
                        <img
                            src={article.thumbnail} alt={article.title}
                            style={{ width: '100%', height: featured ? '100%' : 200, objectFit: 'cover', display: 'block' }}
                        />
                    </div>
                )}
                <div style={{ padding: featured ? '28px 32px' : '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {featured && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 99, background: 'rgba(245,197,24,0.1)', border: '1px solid rgba(245,197,24,0.2)', width: 'fit-content', marginBottom: 12 }}>
                            <TrendingUp size={11} color="#f5c518" />
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#f5c518', letterSpacing: '0.05em' }}>ARTIKEL TERBARU</span>
                        </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, color: 'var(--white-60)', fontSize: 12 }}>
                        <Calendar size={12} />
                        {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h2 style={{ fontSize: featured ? 22 : 16, fontWeight: 700, lineHeight: 1.35, marginBottom: 10, color: 'var(--white)', flex: 1 }}>
                        {article.title}
                    </h2>
                    {article.excerpt && (
                        <p style={{ fontSize: 14, color: 'var(--white-60)', lineHeight: 1.7, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {article.excerpt}
                        </p>
                    )}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginTop: 'auto' }}>
                        Baca Selengkapnya <ArrowRight size={14} />
                    </span>
                </div>
            </article>
        </Link>
    );
}

/* ── Skeleton Loader ──────────────────────────────────────── */
function Skeleton({ h = 200, br = 12 }) {
    return <div style={{ height: h, background: 'var(--bg-card)', borderRadius: br, opacity: 0.5, animation: 'pulse 1.5s ease-in-out infinite' }} />;
}

export default function Blog() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('articles')
            .select('id, title, slug, excerpt, thumbnail, created_at')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .then(({ data }) => { setArticles(data || []); setLoading(false); });
    }, []);

    const featured = articles[0];
    const rest = articles.slice(1);

    return (
        <>
            <style>{`
                @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:0.25} }
                .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                @media(max-width:1024px){ .blog-grid{ grid-template-columns: repeat(2,1fr); } }
                @media(max-width:640px){ .blog-grid{ grid-template-columns: 1fr; } }
                .blog-layout { display: grid; grid-template-columns: 1fr 300px; gap: 40px; align-items: start; }
                @media(max-width:960px){ .blog-layout{ grid-template-columns: 1fr; } .blog-layout .blog-sidebar{ display: none; } }
                .featured-flex { display: flex; gap: 0; }
                @media(max-width:768px){ .featured-flex { flex-direction: column !important; } .featured-flex > div:first-child { width: 100% !important; max-height: 220px !important; } }
            `}</style>
            <Navbar />
            <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 90 }}>
                <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px 80px' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', padding: '40px 0 48px' }}>
                        <div className="section-label" style={{ justifyContent: 'center', marginBottom: 14 }}>Blog & Artikel</div>
                        <h1 className="section-title" style={{ marginBottom: 14 }}>Insight & Tips Bisnis Digital</h1>
                        <p style={{ color: 'var(--white-60)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
                            Strategi, tutorial, dan insight seputar website, SEO, dan marketing digital untuk UMKM Indonesia.
                        </p>
                    </div>

                    <div className="blog-layout">
                        {/* Main content */}
                        <div>
                            {/* Featured Article */}
                            {loading ? (
                                <Skeleton h={280} br={20} />
                            ) : featured ? (
                                <div className="featured-flex" style={{ marginBottom: 32 }}>
                                    <ArticleCard article={featured} featured />
                                </div>
                            ) : null}

                            {/* Ad Banner between featured and grid */}
                            {!loading && articles.length > 0 && (
                                <div style={{ marginBottom: 28 }}>
                                    <AdBanner type="horizontal" />
                                </div>
                            )}

                            {/* Articles Grid */}
                            {loading ? (
                                <div className="blog-grid">
                                    {[1, 2, 3].map(i => <Skeleton key={i} h={300} br={16} />)}
                                </div>
                            ) : rest.length > 0 ? (
                                <div className="blog-grid">
                                    {rest.map(a => <ArticleCard key={a.id} article={a} />)}
                                </div>
                            ) : articles.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--white-60)' }}>
                                    <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
                                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Belum Ada Artikel</h2>
                                    <p style={{ fontSize: 14 }}>Artikel akan segera hadir. Kunjungi kembali nanti!</p>
                                </div>
                            ) : null}
                        </div>

                        {/* Sidebar */}
                        <div className="blog-sidebar" style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {/* About BangBisnis card */}
                            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                    <div style={{ width: 36, height: 36, background: '#f5c518', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14 }}>BangBisnis</div>
                                        <div style={{ fontSize: 12, color: 'var(--white-60)' }}>Jasa Landing Page Indonesia</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--white-60)', lineHeight: 1.65, marginBottom: 14 }}>
                                    Kami bantu UMKM Indonesia tampil profesional di internet. Landing page premium, live dalam 3–5 hari.
                                </p>
                                <a href="/#harga" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#f5c518', borderRadius: 10, color: '#000', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                                    Lihat Paket →
                                </a>
                            </div>

                            {/* Ad sidebar */}
                            <AdBanner type="sidebar" />

                            {/* Tips card */}
                            <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05))', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 16, padding: 20 }}>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 10, letterSpacing: '0.1em' }}>TIPS HARI INI</div>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontStyle: 'italic' }}>
                                    "Website yang loading lebih dari 3 detik kehilangan 53% pengunjung sebelum halaman terbuka."
                                </p>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>— Google Research, 2024</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
