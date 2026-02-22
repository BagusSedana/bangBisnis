import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { FileText, Briefcase, PlusCircle, ExternalLink, UserPlus, X, Mail, Send, CheckCircle } from 'lucide-react';

function maskEmail(email) {
    if (!email) return '';
    const [local, domain] = email.split('@');
    const masked = local.length > 3 ? local.slice(0, 2) + '***' + local.slice(-1) : '***';
    return `${masked}@${domain}`;
}

export default function Dashboard() {
    const { session } = useAuth();
    const [stats, setStats] = useState({ articles: 0, published: 0, portfolio: 0 });
    const [recentArticles, setRecentArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Invite admin modal state
    const [showInvite, setShowInvite] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [invitePassword, setInvitePassword] = useState('');
    const [inviting, setInviting] = useState(false);
    const [inviteResult, setInviteResult] = useState(null); // { success, message }

    useEffect(() => {
        async function load() {
            const [{ count: artCount }, { count: pubCount }, { count: portCount }, { data: recent }] = await Promise.all([
                supabase.from('articles').select('*', { count: 'exact', head: true }),
                supabase.from('articles').select('*', { count: 'exact', head: true }).eq('published', true),
                supabase.from('portfolio').select('*', { count: 'exact', head: true }),
                supabase.from('articles').select('id, title, published, created_at').order('created_at', { ascending: false }).limit(5),
            ]);
            setStats({ articles: artCount || 0, published: pubCount || 0, portfolio: portCount || 0 });
            setRecentArticles(recent || []);
            setLoading(false);
        }
        load();
    }, []);

    const handleInvite = async (e) => {
        e.preventDefault();
        if (!inviteEmail || !invitePassword) return;
        setInviting(true);
        setInviteResult(null);

        const { error } = await supabase.auth.signUp({
            email: inviteEmail,
            password: invitePassword,
            options: {
                emailRedirectTo: `${window.location.origin}/admin/login`,
            }
        });

        setInviting(false);
        if (error) {
            setInviteResult({ success: false, message: error.message });
        } else {
            setInviteResult({ success: true, message: `Admin baru untuk ${inviteEmail} berhasil didaftarkan. Mereka perlu konfirmasi email.` });
            setInviteEmail('');
            setInvitePassword('');
        }
    };

    const statCards = [
        { label: 'Total Artikel', value: stats.articles, icon: <FileText size={20} />, color: '#8b5cf6', to: '/admin/artikel' },
        { label: 'Artikel Publik', value: stats.published, icon: <FileText size={20} />, color: '#10b981', to: '/admin/artikel' },
        { label: 'Portofolio', value: stats.portfolio, icon: <Briefcase size={20} />, color: '#f5c518', to: '/admin/portfolio' },
    ];

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>Dashboard</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                        Selamat datang kembali,{' '}
                        <span style={{ color: '#f5c518', fontWeight: 600 }}>Admin</span>
                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginLeft: 6 }}>
                            ({maskEmail(session?.user?.email)})
                        </span>
                    </p>
                </div>
                {/* Invite admin button */}
                <button
                    onClick={() => { setShowInvite(true); setInviteResult(null); }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        padding: '9px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.65)',
                        fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                >
                    <UserPlus size={15} /> Tambah Admin
                </button>
            </div>

            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
                {statCards.map(({ label, value, icon, color, to }) => (
                    <Link key={label} to={to} style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: '#110f20', border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 16, padding: '22px 24px', cursor: 'pointer',
                            transition: 'border-color 0.2s, transform 0.2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = color + '40'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}
                        >
                            <div style={{ color, marginBottom: 12 }}>{icon}</div>
                            <div style={{ fontSize: 32, fontWeight: 800, color, lineHeight: 1 }}>
                                {loading ? '—' : value}
                            </div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{label}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: 36 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: 'rgba(255,255,255,0.7)' }}>Aksi Cepat</h2>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <Link to="/admin/artikel/baru" style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 18px', borderRadius: 10, textDecoration: 'none',
                        background: 'rgba(245,197,24,0.12)', border: '1px solid rgba(245,197,24,0.25)',
                        color: '#f5c518', fontSize: 14, fontWeight: 500,
                    }}>
                        <PlusCircle size={16} /> Tulis Artikel Baru
                    </Link>
                    <a href="/" target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 18px', borderRadius: 10, textDecoration: 'none',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 500,
                    }}>
                        <ExternalLink size={16} /> Lihat Website
                    </a>
                </div>
            </div>

            {/* Recent Articles */}
            <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: 'rgba(255,255,255,0.7)' }}>Artikel Terbaru</h2>
                {loading ? (
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Memuat...</p>
                ) : recentArticles.length === 0 ? (
                    <div style={{ background: '#110f20', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
                        Belum ada artikel. <Link to="/admin/artikel/baru" style={{ color: '#f5c518' }}>Tulis sekarang →</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {recentArticles.map(a => (
                            <Link key={a.id} to={`/admin/artikel/${a.id}`} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 18px', background: '#110f20',
                                border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12,
                                textDecoration: 'none', transition: 'border-color 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                            >
                                <span style={{ fontSize: 14, color: '#fff' }}>{a.title}</span>
                                <span style={{
                                    fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 99,
                                    background: a.published ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.08)',
                                    color: a.published ? '#34d399' : 'rgba(255,255,255,0.4)',
                                }}>
                                    {a.published ? 'Publik' : 'Draft'}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Invite Admin Modal ── */}
            {showInvite && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
                }} onClick={e => e.target === e.currentTarget && setShowInvite(false)}>
                    <div style={{
                        background: '#0f0d1e', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 20, padding: '32px 28px', width: '100%', maxWidth: 420,
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div>
                                <h2 style={{ fontSize: 18, fontWeight: 700 }}>Tambah Admin Baru</h2>
                                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 3 }}>
                                    Daftarkan akun admin baru langsung dari sini.
                                </p>
                            </div>
                            <button onClick={() => setShowInvite(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4 }}>
                                <X size={20} />
                            </button>
                        </div>

                        {inviteResult ? (
                            <div style={{
                                padding: '20px', borderRadius: 12, textAlign: 'center',
                                background: inviteResult.success ? 'rgba(16,185,129,0.1)' : 'rgba(255,80,80,0.1)',
                                border: `1px solid ${inviteResult.success ? 'rgba(16,185,129,0.25)' : 'rgba(255,80,80,0.25)'}`,
                            }}>
                                {inviteResult.success && <CheckCircle size={28} style={{ color: '#34d399', marginBottom: 10 }} />}
                                <p style={{ fontSize: 14, color: inviteResult.success ? '#34d399' : '#ff8080', lineHeight: 1.6 }}>
                                    {inviteResult.message}
                                </p>
                                <button onClick={() => setInviteResult(null)} style={{
                                    marginTop: 16, padding: '8px 18px', borderRadius: 8, border: 'none',
                                    background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: 13,
                                }}>
                                    Tambah lagi
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleInvite} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Email Admin Baru</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
                                        <input
                                            type="email" required value={inviteEmail} onChange={e => setInviteEmail(e.target.value)}
                                            placeholder="admin@example.com"
                                            style={{ width: '100%', padding: '10px 14px 10px 36px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                                            onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.4)'}
                                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 6 }}>Password Sementara</label>
                                    <input
                                        type="text" required value={invitePassword} onChange={e => setInvitePassword(e.target.value)}
                                        placeholder="Min. 8 karakter"
                                        style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'monospace' }}
                                        onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.4)'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 5 }}>
                                        Berikan password ini ke admin baru. Mereka bisa ganti sendiri setelah login.
                                    </p>
                                </div>
                                <button type="submit" disabled={inviting} style={{
                                    width: '100%', padding: '12px', borderRadius: 10, border: 'none',
                                    background: inviting ? 'rgba(245,197,24,0.5)' : '#f5c518',
                                    color: '#000', fontWeight: 700, fontSize: 14,
                                    cursor: inviting ? 'not-allowed' : 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                                }}>
                                    <Send size={15} /> {inviting ? 'Mendaftarkan...' : 'Daftarkan Admin'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
