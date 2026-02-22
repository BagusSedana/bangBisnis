import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusCircle, Pencil, Trash2, X, Save, ExternalLink } from 'lucide-react';

const initialForm = { title: '', description: '', image_url: '', live_url: '', tags: '' };

const inputStyle = {
    width: '100%', padding: '10px 14px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, color: '#fff', fontSize: 14, outline: 'none',
    boxSizing: 'border-box', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s',
};
const labelStyle = { fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 };

export default function PortfolioAdmin() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(initialForm);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const load = async () => {
        const { data } = await supabase.from('portfolio').select('*').order('created_at', { ascending: false });
        setItems(data || []);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const openNew = () => { setForm(initialForm); setEditId(null); setError(''); setShowModal(true); };
    const openEdit = (item) => {
        setForm({ title: item.title, description: item.description || '', image_url: item.image_url || '', live_url: item.live_url || '', tags: (item.tags || []).join(', ') });
        setEditId(item.id); setError(''); setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.title.trim()) { setError('Judul tidak boleh kosong.'); return; }
        setSaving(true);
        const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
        delete payload.tags_str;

        let err;
        if (editId) {
            ({ error: err } = await supabase.from('portfolio').update(payload).eq('id', editId));
        } else {
            ({ error: err } = await supabase.from('portfolio').insert(payload));
        }

        setSaving(false);
        if (err) { setError(err.message); return; }
        setShowModal(false);
        load();
    };

    const handleDelete = async (id, title) => {
        if (!confirm(`Hapus "${title}"?`)) return;
        await supabase.from('portfolio').delete().eq('id', id);
        setItems(prev => prev.filter(i => i.id !== id));
    };

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Portofolio</h1>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{items.length} proyek</p>
                </div>
                <button onClick={openNew} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
                    background: '#f5c518', border: 'none', borderRadius: 10,
                    color: '#000', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}>
                    <PlusCircle size={16} /> Tambah Proyek
                </button>
            </div>

            {/* Grid */}
            {loading ? (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Memuat...</p>
            ) : items.length === 0 ? (
                <div style={{ background: '#110f20', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
                    Belum ada portofolio. <button onClick={openNew} style={{ background: 'none', border: 'none', color: '#f5c518', cursor: 'pointer', fontSize: 14 }}>Tambah sekarang →</button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                    {items.map(item => (
                        <div key={item.id} style={{
                            background: '#110f20', border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column',
                        }}>
                            {item.image_url && (
                                <img src={item.image_url} alt={item.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                            )}
                            <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{item.title}</div>
                                {item.description && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, flex: 1 }}>{item.description}</p>}
                                {item.tags?.length > 0 && (
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                                        {item.tags.map(t => (
                                            <span key={t} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 99, background: 'rgba(245,197,24,0.1)', color: '#f5c518', fontWeight: 600 }}>{t}</span>
                                        ))}
                                    </div>
                                )}
                                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                                    {item.live_url && (
                                        <a href={item.live_url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                                            <ExternalLink size={12} /> Live
                                        </a>
                                    )}
                                    <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                                        <button onClick={() => openEdit(item)} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: 7, padding: '6px 9px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }} title="Edit"><Pencil size={13} /></button>
                                        <button onClick={() => handleDelete(item.id, item.title)} style={{ background: 'rgba(255,80,80,0.08)', border: 'none', borderRadius: 7, padding: '6px 9px', cursor: 'pointer', color: 'rgba(255,100,100,0.6)' }} title="Hapus"><Trash2 size={13} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
                    onClick={e => e.target === e.currentTarget && setShowModal(false)}>
                    <div style={{ background: '#0f0d1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28, width: '100%', maxWidth: 480, maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
                            <h2 style={{ fontSize: 18, fontWeight: 700 }}>{editId ? 'Edit Proyek' : 'Proyek Baru'}</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}><X size={20} /></button>
                        </div>

                        {error && <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#ff8080', marginBottom: 16 }}>{error}</div>}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                { key: 'title', label: 'Nama Proyek *', placeholder: 'Toko Kue Bu Ani', type: 'text' },
                                { key: 'description', label: 'Deskripsi', placeholder: 'Landing page untuk toko kue...', type: 'textarea' },
                                { key: 'image_url', label: 'URL Gambar', placeholder: 'https://...', type: 'text' },
                                { key: 'live_url', label: 'URL Live', placeholder: 'https://...', type: 'text' },
                                { key: 'tags', label: 'Tags (pisah koma)', placeholder: 'Landing Page, E-commerce, SEO', type: 'text' },
                            ].map(({ key, label, placeholder, type }) => (
                                <div key={key}>
                                    <label style={labelStyle}>{label}</label>
                                    {type === 'textarea' ? (
                                        <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }}
                                            value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                            placeholder={placeholder}
                                            onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.4)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    ) : (
                                        <input type="text" style={inputStyle}
                                            value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                            placeholder={placeholder}
                                            onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.4)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {form.image_url && (
                            <img src={form.image_url} alt="preview" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 10, marginTop: 14 }} />
                        )}

                        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
                            <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontWeight: 600 }}>Batal</button>
                            <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '11px', borderRadius: 10, border: 'none', background: '#f5c518', color: '#000', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                <Save size={15} /> {saving ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
