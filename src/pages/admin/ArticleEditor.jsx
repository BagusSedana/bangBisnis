import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import RichTextEditor from '../../components/RichTextEditor';

function slugify(text) {
    return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, color: '#fff', fontSize: 14, outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
    fontFamily: 'Inter, sans-serif',
};

const labelStyle = { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: 6 };

export default function ArticleEditor() {
    const { id } = useParams();
    const isNew = !id;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '', slug: '', excerpt: '', content: '', thumbnail: '', published: false,
    });
    const [slugManual, setSlugManual] = useState(false);
    const [showSlugEdit, setShowSlugEdit] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(!isNew);

    useEffect(() => {
        if (!isNew) {
            supabase.from('articles').select('*').eq('id', id).single()
                .then(({ data }) => {
                    if (data) setForm({
                        title: data.title, slug: data.slug,
                        excerpt: data.excerpt || '', content: data.content || '',
                        thumbnail: data.thumbnail || '', published: data.published,
                    });
                    setLoading(false);
                });
        }
    }, [id, isNew]);

    const handleTitleChange = (e) => {
        const val = e.target.value;
        setForm(f => ({ ...f, title: val, slug: slugManual ? f.slug : slugify(val) }));
    };

    const handleSlugChange = (e) => {
        setSlugManual(true);
        setForm(f => ({ ...f, slug: e.target.value }));
    };

    const handleContentChange = useCallback((html) => {
        setForm(f => ({ ...f, content: html }));
    }, []);

    const handleSave = async (publish = null) => {
        setError('');
        if (!form.title.trim()) { setError('Judul tidak boleh kosong.'); return; }
        if (!form.slug.trim()) { setError('Slug tidak boleh kosong.'); return; }

        setSaving(true);
        const payload = {
            ...form,
            published: publish !== null ? publish : form.published,
            updated_at: new Date().toISOString(),
        };

        let err;
        if (isNew) {
            ({ error: err } = await supabase.from('articles').insert(payload));
        } else {
            ({ error: err } = await supabase.from('articles').update(payload).eq('id', id));
        }

        if (err) {
            setError(err.message.includes('unique') ? 'Slug ini sudah dipakai. Edit slug di bawah judul.' : err.message);
            setSaving(false);
        } else {
            navigate('/admin/artikel');
        }
    };

    if (loading) return <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Memuat...</p>;

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/admin/artikel')} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                    <ArrowLeft size={16} />
                </button>
                <h1 style={{ fontSize: 20, fontWeight: 700 }}>{isNew ? 'Artikel Baru' : 'Edit Artikel'}</h1>
            </div>

            {/* Error */}
            {error && (
                <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#ff8080', marginBottom: 20 }}>
                    {error}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>
                {/* Left col — main content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Title */}
                    <div>
                        <label style={labelStyle}>Judul Artikel *</label>
                        <input
                            style={{ ...inputStyle, fontSize: 20, fontWeight: 700, padding: '14px 16px' }}
                            value={form.title}
                            onChange={handleTitleChange}
                            placeholder="Tulis judul artikel yang menarik..."
                            onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.4)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                        {/* Slug preview — small & subtle */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                                /blog/<span style={{ color: 'rgba(255,255,255,0.5)' }}>{form.slug || 'slug-otomatis'}</span>
                            </span>
                            <button
                                type="button"
                                onClick={() => setShowSlugEdit(!showSlugEdit)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 2, padding: '2px 6px', borderRadius: 4 }}
                            >
                                {showSlugEdit ? <><ChevronUp size={12} /> Sembunyikan</> : <><ChevronDown size={12} /> Edit slug</>}
                            </button>
                        </div>
                        {/* Collapsible slug edit */}
                        {showSlugEdit && (
                            <div style={{ marginTop: 8 }}>
                                <input
                                    style={{ ...inputStyle, fontFamily: 'monospace', fontSize: 13 }}
                                    value={form.slug}
                                    onChange={handleSlugChange}
                                    placeholder="edit-slug-manual"
                                    onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.4)'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                        )}
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label style={labelStyle}>Ringkasan Singkat</label>
                        <textarea
                            style={{ ...inputStyle, height: 80, resize: 'vertical', fontSize: 14 }}
                            value={form.excerpt}
                            onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                            placeholder="Satu atau dua kalimat yang muncul di halaman blog sebagai preview artikel..."
                            onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.4)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Rich Text Content */}
                    <div>
                        <label style={labelStyle}>Konten Artikel</label>
                        <RichTextEditor
                            value={form.content}
                            onChange={handleContentChange}
                            placeholder="Mulai tulis konten artikel kamu di sini. Gunakan toolbar di atas untuk format teks, heading, list, dan link..."
                        />
                    </div>
                </div>

                {/* Right col — sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 24 }}>

                    {/* Publish card */}
                    <div style={{ background: '#110f20', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
                        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 16, letterSpacing: '0.05em' }}>PUBLIKASI</h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Status</span>
                            <span style={{
                                padding: '4px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                                background: form.published ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.07)',
                                color: form.published ? '#34d399' : 'rgba(255,255,255,0.45)',
                            }}>
                                {form.published ? 'Publik' : 'Draft'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <button onClick={() => handleSave()} disabled={saving} style={{
                                width: '100%', padding: '10px', borderRadius: 10,
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'transparent', color: 'rgba(255,255,255,0.7)',
                                fontWeight: 600, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            }}>
                                <Save size={14} /> Simpan Draft
                            </button>
                            <button onClick={() => handleSave(true)} disabled={saving} style={{
                                width: '100%', padding: '10px', borderRadius: 10, border: 'none',
                                background: saving ? 'rgba(245,197,24,0.5)' : '#f5c518',
                                color: '#000', fontWeight: 700, fontSize: 14,
                                cursor: saving ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                            }}>
                                <Eye size={14} /> {saving ? 'Menyimpan...' : 'Publish'}
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <div style={{ background: '#110f20', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
                        <h3 style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', marginBottom: 12, letterSpacing: '0.05em' }}>THUMBNAIL</h3>
                        <input
                            style={{ ...inputStyle, fontSize: 13 }}
                            value={form.thumbnail}
                            onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))}
                            placeholder="URL gambar (https://...)"
                            onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.4)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                        {form.thumbnail && (
                            <img src={form.thumbnail} alt="preview" style={{ width: '100%', borderRadius: 8, marginTop: 10, objectFit: 'cover', height: 120 }} />
                        )}
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 8, lineHeight: 1.5 }}>
                            Paste URL gambar dari Google Drive, Unsplash, atau hosting gambar lainnya.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile save buttons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <button onClick={() => handleSave()} disabled={saving} style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                    Simpan Draft
                </button>
                <button onClick={() => handleSave(true)} disabled={saving} style={{ flex: 1, padding: '12px', borderRadius: 10, border: 'none', background: '#f5c518', color: '#000', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                    {saving ? 'Menyimpan...' : 'Publish'}
                </button>
            </div>
        </div>
    );
}
