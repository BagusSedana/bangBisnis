import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Calendar, ArrowRight } from 'lucide-react';

export default function LatestArticles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.from('articles')
            .select('title, slug, excerpt, thumbnail, created_at')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(3)
            .then(({ data }) => {
                setArticles(data || []);
                setLoading(false);
            });
    }, []);

    if (loading) return null;
    if (articles.length === 0) return null;

    return (
        <section style={{ padding: '100px 0', background: 'var(--bg)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container">
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                    marginBottom: 48, flexWrap: 'wrap', gap: 20
                }}>
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: 12 }}
                        >
                            Artikel <span className="text-gradient">Terbaru</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{ color: 'var(--white-60)', maxWidth: 500, lineHeight: 1.6 }}
                        >
                            Insight, tips, dan strategi seputar dunia digital marketing dan pengembangan bisnis UMKM.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/blog" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '12px 24px', background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border)', borderRadius: 99,
                            color: 'var(--white)', textDecoration: 'none',
                            fontWeight: 600, fontSize: 14, transition: 'all 0.2s'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--white)'; }}
                        >
                            Lihat Semua Artikel <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </div>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 30
                }}>
                    {articles.map((article, i) => (
                        <motion.div
                            key={article.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                                <article className="glass-card" style={{
                                    height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,197,24,0.3)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
                                >
                                    {article.thumbnail && (
                                        <div style={{ width: '100%', height: 200, overflow: 'hidden' }}>
                                            <img src={article.thumbnail} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, color: 'var(--white-60)', fontSize: 12 }}>
                                            <Calendar size={12} />
                                            {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: 'var(--white)', lineHeight: 1.4 }}>
                                            {article.title}
                                        </h3>
                                        {article.excerpt && (
                                            <p style={{ fontSize: 14, color: 'var(--white-60)', lineHeight: 1.6, marginBottom: 20, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {article.excerpt}
                                            </p>
                                        )}
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--accent)', fontWeight: 600, marginTop: 'auto' }}>
                                            Baca Selengkapnya <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
