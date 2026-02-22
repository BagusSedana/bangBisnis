import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdBanner from '../components/AdBanner';

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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const LIMIT = 10;

    useEffect(() => {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const fetchArticles = async () => {
            // Count total published articles
            const { count } = await supabase.from('articles')
                .select('*', { count: 'exact', head: true })
                .eq('published', true);

            if (count !== null) setTotalPages(Math.max(1, Math.ceil(count / LIMIT)));

            // Fetch paginated data
            const start = (page - 1) * LIMIT;
            const end = start + LIMIT - 1;

            const { data } = await supabase.from('articles')
                .select('id, title, slug, excerpt, thumbnail, created_at')
                .eq('published', true)
                .order('created_at', { ascending: false })
                .range(start, end);

            setArticles(data || []);
            setLoading(false);
        };
        fetchArticles();
    }, [page]);

    const featured = page === 1 ? articles[0] : null;
    const rest = page === 1 ? articles.slice(1) : articles;

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
                            {loading && page === 1 ? (
                                <Skeleton h={280} br={20} />
                            ) : featured ? (
                                <div className="featured-flex" style={{ marginBottom: 32 }}>
                                    <ArticleCard article={featured} featured />
                                </div>
                            ) : null}

                            {/* Ad Banner between featured and grid */}
                            {!loading && articles.length > 0 && (
                                <div style={{ marginBottom: 28 }}>
                                    <AdBanner placement="content_bottom" />
                                </div>
                            )}

                            {/* Articles Grid */}
                            {loading && page > 1 ? (
                                <div className="blog-grid" style={{ marginTop: 20 }}>
                                    {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} h={300} br={16} />)}
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

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 40 }}>
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        style={{
                                            padding: '8px 16px', borderRadius: 8, background: 'var(--bg-card)',
                                            color: '#fff', border: '1px solid var(--border)',
                                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                                            opacity: page === 1 ? 0.5 : 1
                                        }}
                                    >
                                        ← Prev
                                    </button>
                                    <span style={{ fontSize: 14, color: 'var(--white-60)' }}>
                                        Halaman {page} dari {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        style={{
                                            padding: '8px 16px', borderRadius: 8, background: 'var(--bg-card)',
                                            color: '#fff', border: '1px solid var(--border)',
                                            cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                            opacity: page === totalPages ? 0.5 : 1
                                        }}
                                    >
                                        Next →
                                    </button>
                                </div>
                            )}
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
                            <AdBanner placement="sidebar" />

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
