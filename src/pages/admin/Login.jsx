import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message === 'Invalid login credentials'
                ? 'Email atau password salah. Coba lagi.'
                : error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    const inputStyle = {
        width: '100%', padding: '12px 44px 12px 40px',
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10, color: '#fff', fontSize: 14, outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box',
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#070612', padding: 20,
        }}>
            {/* Background glow */}
            <div style={{
                position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                width: '100%', maxWidth: 400,
                background: 'rgba(17,15,32,0.9)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20, padding: '40px 36px',
                backdropFilter: 'blur(20px)',
                position: 'relative', zIndex: 1,
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{
                        width: 48, height: 48, background: '#f5c518', borderRadius: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                    }}>
                        <Zap size={24} color="#000" fill="#000" />
                    </div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Admin Panel</h1>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Masuk ke dashboard BangBisnis</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Email */}
                    <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                        <input
                            type="email" placeholder="Email admin" value={email}
                            onChange={e => setEmail(e.target.value)}
                            required autoFocus
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.5)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ position: 'relative' }}>
                        <Lock size={16} style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                        <input
                            type={showPass ? 'text' : 'password'} placeholder="Password" value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = 'rgba(245,197,24,0.5)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} style={{
                            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                            background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)',
                            padding: 0,
                        }}>
                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{
                            background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)',
                            borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#ff8080',
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit" disabled={loading}
                        style={{
                            width: '100%', padding: '13px', borderRadius: 10, border: 'none',
                            background: loading ? 'rgba(245,197,24,0.5)' : '#f5c518',
                            color: '#000', fontWeight: 700, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s', marginTop: 4,
                        }}
                    >
                        {loading ? 'Masuk...' : 'Masuk'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                    Halaman ini hanya untuk admin BangBisnis.
                </p>
            </div>
        </div>
    );
}
