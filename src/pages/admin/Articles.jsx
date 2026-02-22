import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PlusCircle, Pencil, Trash2, Globe, FileText, Search } from 'lucide-react';

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const load = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('articles')
            .select('id, title, slug, published, created_at')
            .order('created_at', { ascending: false });
        setArticles(data || []);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (id, title) => {
        if (!confirm(`Hapus artikel "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
        await supabase.from('articles').delete().eq('id', id);
        setArticles(prev => prev.filter(a => a.id !== id));
    };

    const handleTogglePublish = async (id, currentPublished) => {
        await supabase.from('articles').update({ published: !currentPublished }).eq('id', id);
        setArticles(prev => prev.map(a => a.id === id ? { ...a, published: !currentPublished } : a));
    };

    const filtered = articles.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Artikel Blog</h1>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{articles.length} artikel</p>
                </div>
                <Link to="/admin/artikel/baru" style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
                    background: '#f5c518', borderRadius: 10, textDecoration: 'none',
                    color: '#000', fontWeight: 700, fontSize: 14,
                }}>
                    <PlusCircle size={16} /> Artikel Baru
                </Link>
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: 20 }}>
                <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                <input
                    type="text" placeholder="Cari artikel..." value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        width: '100%', maxWidth: 360, padding: '10px 14px 10px 38px',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 10, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
                    }}
                />
            </div>

            {/* Table */}
            {loading ? (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Memuat...</p>
            ) : filtered.length === 0 ? (
                <div style={{
                    background: '#110f20', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12, padding: '48px', textAlign: 'center',
                }}>
                    <FileText size={36} style={{ color: 'rgba(255,255,255,0.2)', marginBottom: 12 }} />
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
                        {search ? 'Tidak ada hasil.' : (<>Belum ada artikel. <Link to="/admin/artikel/baru" style={{ color: '#f5c518' }}>Buat sekarang →</Link></>)}
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {filtered.map(article => (
                        <div key={article.id} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '16px 20px', background: '#110f20',
                            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12,
                            gap: 12, flexWrap: 'wrap',
                        }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {article.title}
                                </div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                                    {new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {/* Status badge */}
                                <button
                                    onClick={() => handleTogglePublish(article.id, article.published)}
                                    style={{
                                        padding: '5px 12px', borderRadius: 99, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                                        background: article.published ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.07)',
                                        color: article.published ? '#34d399' : 'rgba(255,255,255,0.45)',
                                        transition: 'all 0.2s',
                                    }}
                                    title={article.published ? 'Klik untuk jadikan draft' : 'Klik untuk publish'}
                                >
                                    <Globe size={11} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                                    {article.published ? 'Publik' : 'Draft'}
                                </button>

                                {/* Edit */}
                                <button
                                    onClick={() => navigate(`/admin/artikel/${article.id}`)}
                                    style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s' }}
                                    title="Edit"
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                                >
                                    <Pencil size={14} />
                                </button>

                                {/* Delete */}
                                <button
                                    onClick={() => handleDelete(article.id, article.title)}
                                    style={{ background: 'rgba(255,80,80,0.08)', border: 'none', borderRadius: 8, padding: '7px 10px', cursor: 'pointer', color: 'rgba(255,100,100,0.6)', transition: 'all 0.2s' }}
                                    title="Hapus"
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.15)'; e.currentTarget.style.color = '#ff6464'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.08)'; e.currentTarget.style.color = 'rgba(255,100,100,0.6)'; }}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
