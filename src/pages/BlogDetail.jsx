import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowLeft, Clock, Share2, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ── Reading time estimate ────────────────────────────── */
function readingTime(html) {
    const text = html?.replace(/<[^>]+>/g, '') || '';
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

/* ── Ad Banner ─────────────────────────────────────────── */
function AdBanner({ type = 'inline' }) {
    const adLink = 'https://accesstrade.co.id/';
    if (type === 'sidebar') {
        return (
            <a href={adLink} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{
                    background: 'linear-gradient(135deg, rgba(245,197,24,0.08), rgba(17,15,32,0.5))',
                    border: '1px solid rgba(245,197,24,0.2)', borderRadius: 16,
                    padding: 20, textAlign: 'center',
                    transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer',
                }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,197,24,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,197,24,0.2)'; e.currentTarget.style.transform = 'none'; }}
                >
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 10, letterSpacing: '0.1em' }}>SPONSOR</div>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>💡</div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#fff' }}>Hasilkan dari Blog Kamu</div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 14 }}>
                        Pasang iklan affiliate AccessTrade dan dapatkan komisi untuk setiap klik & konversi.
                    </p>
                    <div style={{ padding: '9px 16px', background: '#f5c518', borderRadius: 8, color: '#000', fontSize: 12, fontWeight: 700, display: 'inline-block' }}>
                        Daftar Publisher →
                    </div>
                </div>
            </a>
        );
    }
    /* inline (between content sections) */
    return (
        <a href={adLink} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'block', textDecoration: 'none', margin: '32px 0' }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.06))',
                border: '1px solid rgba(99,102,241,0.2)', borderRadius: 16,
                padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18,
                transition: 'border-color 0.2s', cursor: 'pointer',
            }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'}
            >
                <div style={{ fontSize: 36, flexShrink: 0 }}>🌐</div>
                <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: 4 }}>IKLAN</div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Butuh Domain & Hosting Murah?</div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                        Dapatkan hosting premium mulai Rp 15.000/bulan. SSD cepat, gratis SSL, dan support Indonesia.
                    </p>
                </div>
                <div style={{ padding: '9px 16px', background: 'rgba(99,102,241,0.85)', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0, whiteSpace: 'nowrap' }}>
                    Cek Harga →
                </div>
            </div>
        </a>
    );
}

export default function BlogDetail() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        supabase.from('articles').select('*').eq('slug', slug).eq('published', true).single()
            .then(({ data, error }) => {
                if (error || !data) { setNotFound(true); setLoading(false); return; }
                setArticle(data);
                // Fetch 3 other published articles
                supabase.from('articles')
                    .select('id, title, slug, excerpt, thumbnail, created_at')
                    .eq('published', true)
                    .neq('slug', slug)
                    .order('created_at', { ascending: false })
                    .limit(3)
                    .then(({ data: rel }) => setRelated(rel || []));
                setLoading(false);
            });
    }, [slug]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({ title: article?.title, url: window.location.href });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link artikel disalin ke clipboard!');
        }
    };

    if (loading) return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'var(--white-60)' }}>
                    <div style={{ width: 40, height: 40, border: '3px solid rgba(245,197,24,0.3)', borderTopColor: '#f5c518', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                    <p>Memuat artikel...</p>
                </div>
            </div>
        </>
    );

    if (notFound || !article) return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                <div style={{ fontSize: 64 }}>😕</div>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>Artikel tidak ditemukan</h1>
                <Link to="/blog" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>← Kembali ke Blog</Link>
            </div>
        </>
    );

    const minutes = readingTime(article.content);

    return (
        <>
            <style>{`
                .article-layout { display: grid; grid-template-columns: 1fr 280px; gap: 40px; align-items: start; max-width: 1100px; margin: 0 auto; padding: 0 24px 80px; }
                @media(max-width:900px){ .article-layout{ grid-template-columns: 1fr; } .article-sidebar{ display: none; } }
                .article-content h2 { font-size: 1.35rem; font-weight: 700; margin: 2em 0 0.7em; color: #fff; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.07); }
                .article-content h3 { font-size: 1.1rem; font-weight: 600; margin: 1.5em 0 0.5em; color: #eee; }
                .article-content p { margin: 0 0 1.1em; color: rgba(255,255,255,0.8); line-height: 1.85; font-size: 16px; }
                .article-content ul, .article-content ol { margin: 0.7em 0 1.1em 1.5em; }
                .article-content li { margin-bottom: 6px; color: rgba(255,255,255,0.8); line-height: 1.75; font-size: 16px; }
                .article-content strong { color: #fff; font-weight: 700; }
                .article-content em { color: rgba(255,255,255,0.75); }
                .article-content a { color: #f5c518; text-decoration: underline; }
                .article-content blockquote { border-left: 3px solid #f5c518; margin: 1.5em 0; padding: 12px 20px; background: rgba(245,197,24,0.05); border-radius: 0 10px 10px 0; font-style: italic; color: rgba(255,255,255,0.7); }
                .article-content hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2em 0; }
                .related-card:hover { border-color: rgba(245,197,24,0.3) !important; transform: translateY(-2px); }
            `}</style>
            <Navbar />

            {/* Thumbnail hero */}
            {article.thumbnail && (
                <div style={{ paddingTop: 80, background: 'var(--bg)' }}>
                    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
                        <img src={article.thumbnail} alt={article.title} style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 20, display: 'block' }} />
                    </div>
                </div>
            )}

            <div style={{ background: 'var(--bg)', paddingTop: article.thumbnail ? 0 : 90 }}>
                <div className="article-layout">
                    {/* ── Main article ── */}
                    <main>
                        {/* Back + meta */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
                            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--white-60)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
                                <ArrowLeft size={14} /> Semua Artikel
                            </Link>
                            <button onClick={handleShare} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 14px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 13 }}>
                                <Share2 size={13} /> Bagikan
                            </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--white-60)', fontSize: 13, marginBottom: 16, flexWrap: 'wrap' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={13} />{new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={13} />{minutes} menit baca</span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: 16, color: '#fff' }}>
                            {article.title}
                        </h1>

                        {article.excerpt && (
                            <p style={{ fontSize: 18, color: 'var(--white-60)', lineHeight: 1.75, marginBottom: 32, paddingBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                {article.excerpt}
                            </p>
                        )}

                        {/* Content */}
                        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

                        {/* Mid-article Ad */}
                        <AdBanner type="inline" />

                        {/* Bottom CTA */}
                        <div style={{ marginTop: 48, padding: '32px', background: 'linear-gradient(135deg, rgba(245,197,24,0.07), rgba(245,197,24,0.02))', border: '1px solid rgba(245,197,24,0.18)', borderRadius: 20, textAlign: 'center' }}>
                            <div style={{ fontSize: 28, marginBottom: 12 }}>🚀</div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Siap Punya Website Profesional?</h3>
                            <p style={{ color: 'var(--white-60)', marginBottom: 20, fontSize: 15, lineHeight: 1.6 }}>
                                Konsultasi gratis dengan tim BangBisnis. Tidak ada biaya komitmen.
                            </p>
                            <a href={`https://wa.me/6287701785344?text=${encodeURIComponent('Halo Bang Bisnis! Saya baca artikel blog dan tertarik konsultasi website.')}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                                Chat WhatsApp Sekarang
                            </a>
                        </div>

                        {/* Related articles */}
                        {related.length > 0 && (
                            <div style={{ marginTop: 48 }}>
                                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>Artikel Lainnya</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {related.map(r => (
                                        <Link key={r.id} to={`/blog/${r.slug}`} className="related-card" style={{
                                            display: 'flex', gap: 16, padding: '14px 16px',
                                            background: 'var(--bg-card)', border: '1px solid var(--border)',
                                            borderRadius: 12, textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s',
                                        }}>
                                            {r.thumbnail && <img src={r.thumbnail} alt={r.title} style={{ width: 70, height: 52, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.4, marginBottom: 4 }}>{r.title}</div>
                                                <div style={{ fontSize: 12, color: 'var(--white-60)' }}>{new Date(r.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>

                    {/* ── Sidebar ── */}
                    <aside className="article-sidebar" style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Ad */}
                        <AdBanner type="sidebar" />

                        {/* About BangBisnis */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                <div style={{ width: 34, height: 34, background: '#f5c518', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚡</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 14 }}>BangBisnis</div>
                                    <div style={{ fontSize: 11, color: 'var(--white-60)' }}>Jasa Landing Page #1 Indonesia</div>
                                </div>
                            </div>
                            <p style={{ fontSize: 12.5, color: 'var(--white-60)', lineHeight: 1.65, marginBottom: 14 }}>
                                Landing page premium untuk UMKM Indonesia. Desain modern, SEO-ready, live dalam 3–5 hari.
                            </p>
                            <a href="/#harga" style={{ display: 'block', textAlign: 'center', padding: '9px', background: '#f5c518', borderRadius: 10, color: '#000', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                                Lihat Paket & Harga →
                            </a>
                        </div>

                        {/* WhatsApp */}
                        <a href="https://wa.me/6287701785344" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textDecoration: 'none' }}>
                            <div style={{
                                background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)',
                                borderRadius: 16, padding: '16px 18px', textAlign: 'center',
                                transition: 'border-color 0.2s', cursor: 'pointer',
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(37,211,102,0.2)'}
                            >
                                <div style={{ fontSize: 22, marginBottom: 8 }}>💬</div>
                                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Konsultasi Gratis</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Chat langsung via WhatsApp</div>
                            </div>
                        </a>
                    </aside>
                </div>
            </div>
            <Footer />
        </>
    );
}
