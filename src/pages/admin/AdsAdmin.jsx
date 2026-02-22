import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Check, X as XIcon } from 'lucide-react';

export default function AdsAdmin() {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);

    // Form state
    const [title, setTitle] = useState('');
    const [placement, setPlacement] = useState('sidebar'); // sidebar | content_bottom
    const [imageUrl, setImageUrl] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [isActive, setIsActive] = useState(true);

    const fetchAds = async () => {
        setLoading(true);
        const { data } = await supabase.from('ads').select('*').order('created_at', { ascending: false });
        setAds(data || []);
        setLoading(false);
    };

    useEffect(() => { fetchAds(); }, []);

    const resetForm = () => {
        setEditing(null);
        setTitle('');
        setPlacement('sidebar');
        setImageUrl('');
        setLinkUrl('');
        setIsActive(true);
    };

    const handleEdit = (ad) => {
        setEditing(ad.id);
        setTitle(ad.title);
        setPlacement(ad.placement);
        setImageUrl(ad.image_url);
        setLinkUrl(ad.link_url);
        setIsActive(ad.is_active);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Hapus banner iklan ini permanen?')) return;
        setLoading(true);
        await supabase.from('ads').delete().eq('id', id);
        fetchAds();
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!title || !imageUrl || !linkUrl) return alert('Judul, URL Gambar Banner, dan Link Affiliate harus diisi.');
        setLoading(true);

        const payload = { title, placement, image_url: imageUrl, link_url: linkUrl, is_active: isActive };
        let err = null;
        if (editing) {
            const { error } = await supabase.from('ads').update(payload).eq('id', editing);
            err = error;
        } else {
            const { error } = await supabase.from('ads').insert([payload]);
            err = error;
        }

        if (err) {
            console.error(err);
            alert('Gagal menyimpan iklan: ' + err.message);
            setLoading(false);
            return;
        }

        resetForm();
        await fetchAds();
    };

    const toggleActive = async (ad) => {
        setLoading(true);
        const { error } = await supabase.from('ads').update({ is_active: !ad.is_active }).eq('id', ad.id);
        if (error) {
            console.error(error);
            alert('Gagal update status: ' + error.message);
        }
        await fetchAds();
    };

    return (
        <div>
            <style>{`
                .admin-grid-layout { display: grid; grid-template-columns: 350px 1fr; gap: 32px; align-items: start; }
                @media(max-width: 900px) { .admin-grid-layout { grid-template-columns: 1fr; } }
            `}</style>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700 }}>Manajemen Iklan</h1>
            </div>

            <div className="admin-grid-layout">
                {/* Form Tambah/Edit */}
                <div style={{ background: 'var(--bg-card)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
                    <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
                        {editing ? 'Edit Iklan' : 'Tambah Iklan Baru'}
                    </h2>
                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: 'var(--white-60)' }}>Judul / Referensi (Misal: Niagahoster Promo)</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="admin-input" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: 'var(--white-60)' }}>Posisi Tampil (Placement)</label>
                            <select value={placement} onChange={e => setPlacement(e.target.value)} className="admin-input" style={{ width: '100%' }}>
                                <option value="sidebar">Sidebar Kanan (300x600 dll)</option>
                                <option value="content_bottom">Bawah / Tengah Konten (1344x624)</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: 'var(--white-60)' }}>Link Gambar Banner (URL dari AccessTrade)</label>
                            <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required placeholder="https://..." className="admin-input" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: 13, marginBottom: 6, color: 'var(--white-60)' }}>Link Tujuan (Affiliate Link Real)</label>
                            <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} required placeholder="https://atid.me/..." className="admin-input" style={{ width: '100%' }} />
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, marginTop: 4, background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)' }}>
                            <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} style={{ width: 16, height: 16 }} />
                            Aman Tampil di Website (Aktif)
                        </label>

                        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                            <button type="submit" disabled={loading} style={{ flex: 1, padding: '12px', background: 'var(--accent)', color: '#000', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s' }}>
                                {loading ? 'Menyimpan...' : (editing ? 'Simpan Perubahan' : 'Tambahkan Iklan')}
                            </button>
                            {editing && (
                                <button type="button" onClick={resetForm} style={{ padding: '10px 16px', background: 'transparent', border: '1px solid var(--border)', color: '#fff', borderRadius: 8, cursor: 'pointer', fontWeight: 500 }}>
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List Ads */}
                <div style={{ background: 'var(--bg-card)', padding: '20px 24px', borderRadius: 16, border: '1px solid var(--border)' }}>
                    <div className="admin-table-container">
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--white-60)', fontSize: 12 }}>
                                    <th style={{ padding: '12px 16px', fontWeight: 600, width: 120 }}>Preview</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Detail Iklan</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
                                    <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && ads.length === 0 ? (
                                    <tr><td colSpan={4} style={{ padding: 32, textAlign: 'center', color: 'var(--white-60)' }}>Memuat data iklan...</td></tr>
                                ) : ads.length === 0 ? (
                                    <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: 'var(--white-60)' }}>
                                        <div style={{ fontSize: 32, marginBottom: 12 }}>💼</div>
                                        <div>Belum ada banner iklan.</div>
                                    </td></tr>
                                ) : (
                                    ads.map(ad => (
                                        <tr key={ad.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                                            <td style={{ padding: '16px' }}>
                                                <a href={ad.image_url} target="_blank" rel="noreferrer" title="Lihat gambar penuh">
                                                    <div style={{
                                                        width: '100%', height: 60, borderRadius: 8, overflow: 'hidden',
                                                        background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                    }}>
                                                        {ad.image_url ? (
                                                            <img src={ad.image_url} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                        ) : <span style={{ fontSize: 20 }}>🖼️</span>}
                                                    </div>
                                                </a>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{ad.title}</div>
                                                <div style={{ fontSize: 11, color: 'var(--white-60)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                                    <span style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.08)', borderRadius: 4, fontWeight: 500 }}>
                                                        {ad.placement === 'sidebar' ? 'Sidebar Kanan' : 'Feed / Konten Bawah'}
                                                    </span>
                                                </div>
                                                <a href={ad.link_url} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
                                                    Tujuan Link ↗
                                                </a>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <button onClick={() => toggleActive(ad)} style={{
                                                    background: 'transparent', border: 'none', cursor: 'pointer',
                                                    padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6,
                                                    color: ad.is_active ? '#10b981' : 'var(--white-60)',
                                                    backgroundColor: ad.is_active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                                                    transition: 'all 0.2s'
                                                }}>
                                                    {ad.is_active ? <><Check size={14} /> Aktif</> : <><XIcon size={14} /> Nonaktif</>}
                                                </button>
                                            </td>
                                            <td style={{ padding: '16px', textAlign: 'right' }}>
                                                <div style={{ display: 'inline-flex', gap: 8 }}>
                                                    <button onClick={() => handleEdit(ad)} className="btn-icon" title="Edit Iklan"><Edit2 size={16} /></button>
                                                    <button onClick={() => handleDelete(ad.id)} className="btn-icon" style={{ color: '#ef4444' }} title="Hapus"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
