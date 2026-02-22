import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Megaphone, LogOut, Zap, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { to: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, end: true },
    { to: '/admin/artikel', label: 'Artikel Blog', icon: <FileText size={18} /> },
    { to: '/admin/portfolio', label: 'Portofolio', icon: <Briefcase size={18} /> },
    { to: '/admin/iklan', label: 'Manajemen Iklan', icon: <Megaphone size={18} /> },
];

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const sidebarContent = (
        <div style={{
            width: 240, minHeight: '100vh', background: '#0a0818',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', flexDirection: 'column',
            padding: '24px 0',
            position: 'fixed', top: 0, left: sidebarOpen ? 0 : -240,
            zIndex: 200, transition: 'left 0.3s ease',
        }} className="admin-sidebar">
            {/* Logo */}
            <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <div style={{ width: 28, height: 28, background: '#f5c518', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={15} color="#000" fill="#000" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>Bang<span style={{ color: '#f5c518' }}>Bisnis</span> <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Admin</span></span>
                </a>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {navItems.map(({ to, label, icon, end }) => (
                    <NavLink
                        key={to} to={to} end={end}
                        onClick={() => setSidebarOpen(false)}
                        style={({ isActive }) => ({
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '10px 12px', borderRadius: 10, textDecoration: 'none',
                            fontSize: 14, fontWeight: 500, transition: 'all 0.15s',
                            color: isActive ? '#f5c518' : 'rgba(255,255,255,0.6)',
                            background: isActive ? 'rgba(245,197,24,0.1)' : 'transparent',
                        })}
                    >
                        {icon}{label}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                        padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        background: 'transparent', color: 'rgba(255,100,100,0.8)', fontSize: 14, fontWeight: 500,
                        transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,100,100,0.1)'; e.currentTarget.style.color = '#ff6464'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,100,100,0.8)'; }}
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#070612' }}>
            <style>{`
                @media (min-width: 769px) {
                    .admin-sidebar { left: 0 !important; }
                    .admin-main { margin-left: 240px !important; }
                    .admin-mobile-toggle { display: none !important; }
                }
            `}</style>

            {sidebarContent}

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150 }}
                />
            )}

            {/* Main content */}
            <div className="admin-main" style={{ flex: 1, marginLeft: 0 }}>
                {/* Mobile top bar */}
                <div className="admin-mobile-toggle" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 20px', background: '#0a0818',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}>
                    <span style={{ fontWeight: 700, color: '#f5c518', fontSize: 15 }}>BangBisnis Admin</span>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                <div style={{ padding: '32px 28px', maxWidth: 1100, margin: '0 auto' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
