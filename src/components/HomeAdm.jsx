import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import AdminSolicitudes from './AdminSolicitudes';
import AdminUsuarios from './AdminUsuarios';
import './HomeAdm.css';

// ── ICONOS SVG (ESTILO NEXUS) ──
const IconHome = () => (
    <div className="na-nav-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
    </div>
);

const IconSolicitudes = () => (
    <div className="na-nav-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    </div>
);

const IconUsuarios = () => (
    <div className="na-nav-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    </div>
);

const AdminHome = () => {
    const [vista, setVista] = useState('resumen');
    const [usuarios, setUsuarios] = useState([]); // Datos de la DB
    const [solicitudes, setSolicitudes] = useState([]); // Datos de la DB para solicitudes
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    // ── LÓGICA PARA OBTENER USUARIOS ──
    const obtenerUsuarios = async () => {
        setCargando(true);
        try {
            // Ajustamos a la ruta completa que definiste en el backend
            const response = await axios.get('http://localhost:5000/api/admin/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al traer usuarios:", error);
        } finally {
            setCargando(false);
        }
    };

    // ── LÓGICA PARA OBTENER SOLICITUDES ──
    const obtenerSolicitudes = async () => {
        setCargando(true);
        try {
            const response = await axios.get('http://localhost:5000/api/admin/solicitudes');
            setSolicitudes(response.data);
        } catch (error) {
            console.error("Error al traer solicitudes:", error);
        } finally {
            setCargando(false);
        }
    };

    const eliminarUsuario = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/usuarios/${id}`);
                setUsuarios(usuarios.filter(u => u.id !== id));
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    // ── EFECTO PARA CARGAR DATOS SEGÚN LA VISTA SELECCIONADA ──
    useEffect(() => {
        if (vista === 'usuarios') {
            obtenerUsuarios();
        } else if (vista === 'solicitudes') {
            obtenerSolicitudes();
        }
    }, [vista]);

    const cerrarSesion = () => {
        if (window.confirm("¿Deseas salir de NEXUS?")) {
            localStorage.clear();
            navigate('/login');
        }
    };

    return (
        <div className="na-layout">
            {/* ── BARRA LATERAL (SIDEBAR) ── */}
            <aside className="na-sidebar">
                <div className="na-sidebar-logo">
                    <span>NEXUS</span> <span className="na-sidebar-tag">ADMIN</span>
                </div>

                <nav className="na-sidebar-nav">
                    <button 
                        onClick={() => setVista('resumen')} 
                        className={`na-nav-item ${vista === 'resumen' ? 'na-nav-active' : ''}`}
                    >
                        <IconHome /> Inicio
                    </button>
                    <button 
                        onClick={() => setVista('solicitudes')} 
                        className={`na-nav-item ${vista === 'solicitudes' ? 'na-nav-active' : ''}`}
                    >
                        <IconSolicitudes /> Solicitudes
                    </button>
                    <button 
                        onClick={() => setVista('usuarios')} 
                        className={`na-nav-item ${vista === 'usuarios' ? 'na-nav-active' : ''}`}
                    >
                        <IconUsuarios /> Usuarios
                    </button>
                </nav>

                <button onClick={cerrarSesion} className="na-logout-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Cerrar Sesión
                </button>
            </aside>

            {/* ── CONTENIDO PRINCIPAL (MAIN) ── */}
            <main className="na-main">
                <header className="na-topbar">
                    <div className="na-breadcrumb">
                        {vista === 'resumen' ? 'Inicio' : vista === 'solicitudes' ? 'Solicitudes' : 'Usuarios'}
                    </div>
                    <div className="na-user-pill">
                        <span>Hola, Administrador</span>
                        <div className="na-avatar-circle">AD</div>
                    </div>
                </header>

                <div className="na-content">
                    {/* VISTA: INICIO / RESUMEN */}
                    {vista === 'resumen' && (
                        <div className="na-view na-fade-in">
                            <div className="na-welcome-banner">
                                <div>
                                    <p className="na-welcome-greeting">Bienvenido de nuevo,</p>
                                    <h1 className="na-welcome-name">Panel Administrativo</h1>
                                    <span className="na-welcome-role">CONTROL GLOBAL</span>
                                </div>
                                <div className="na-avatar-initials-lg">AD</div>
                            </div>
                            
                            <div className="na-stats-grid">
                                {/* Tus tarjetas de estadísticas aquí */}
                            </div>
                        </div>
                    )}

                    {/* VISTA: SOLICITUDES */}
                    {vista === 'solicitudes' && (
                        <div className="na-table-container na-fade-in">
                            {cargando ? (
                                <div className="na-empty-msg">Cargando solicitudes...</div>
                            ) : (
                                <AdminSolicitudes solicitudes={solicitudes} />
                            )}
                        </div>
                    )}

                    {/* VISTA: USUARIOS (Datos Reales de DB) */}
                    {vista === 'usuarios' && (
                        cargando ? (
                            <div className="na-empty-msg">Cargando base de datos de NEXUS...</div>
                        ) : (
                            <AdminUsuarios 
                                usuarios={usuarios} 
                                eliminarUsuario={eliminarUsuario} 
                            />
                        )
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminHome;