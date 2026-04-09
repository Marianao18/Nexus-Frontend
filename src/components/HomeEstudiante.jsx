import React, { useState } from 'react';
import axios from 'axios';
import './HomeEstudiante.css'; 

// ─── ICONOS MANUALES (Sin dependencias externas para evitar errores) ───
const IconHome = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconBook = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>;
const IconMap = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
const IconChart = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>;
const IconUser = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconLogout = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IconToggle = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const IconStar = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconLock = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const IconEye = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconSave = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;

const HomeEstudiante = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const userName = localStorage.getItem('userName') || 'Estudiante';
  const userEmail = localStorage.getItem('email') || 'estudiante@nexus.com';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = () => {
  if (window.confirm("¿Deseas cerrar sesión?")) {
    localStorage.clear();
    window.dispatchEvent(new Event('authChange'));
    window.location.href = '/'; 
  }
};

  const navItems = [
    { id: 'inicio',   label: 'Inicio',               icon: <IconHome /> },
    { id: 'cursos',   label: 'Mis Cursos',           icon: <IconBook /> },
    { id: 'rutas',    label: 'Rutas de Aprendizaje', icon: <IconMap /> },
    { id: 'progreso', label: 'Progreso',             icon: <IconChart /> },
    { id: 'perfil',   label: 'Mi Perfil',            icon: <IconUser /> },
  ];

  return (
    <div className="est-wrapper">
      <aside className={`est-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="est-sidebar-header">
          <div className="est-logo">
            <span className="est-logo-nex">NEX</span><span className="est-logo-us">US</span>
            <span className="est-role-badge">ESTUDIANTE</span>
          </div>
          <button className="est-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <IconToggle />
          </button>
        </div>

        <div className="est-profile-mini">
          <div className="est-avatar-sm">{initials}</div>
          {sidebarOpen && (
            <div className="est-profile-info">
              <span className="est-profile-name">{userName}</span>
              <span className="est-profile-sub">Nivel 3 · 1.240 XP</span>
            </div>
          )}
        </div>

        <nav className="est-nav">
          {navItems.map(item => (
            <button 
              key={item.id} 
              className={`est-nav-item ${activeSection === item.id ? 'active' : ''}`} 
              onClick={() => setActiveSection(item.id)}
            >
              <span className="est-nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="est-nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="est-sidebar-footer" style={{ marginTop: 'auto', width: '100%' }}>
            <button 
                className="est-logout-btn" 
                onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                }}
                type="button"
            >
                <IconLogout /> 
                {sidebarOpen && <span style={{ marginLeft: '10px' }}>Cerrar sesión</span>}
            </button>
        </div>
      </aside>

      <main className="est-main">
        <header className="est-topbar">
          <h1 className="est-page-title">{navItems.find(n => n.id === activeSection)?.label}</h1>
          <div className="est-topbar-right">
            <span>Hola, {userName.split(' ')[0]}</span>
            <div className="est-avatar-top">{initials}</div>
          </div>
        </header>

        <div className="est-content">
          {activeSection === 'inicio'   && <SectionInicio userName={userName} initials={initials} setActiveSection={setActiveSection} />}
          {activeSection === 'cursos'   && <SectionCursos />}
          {activeSection === 'rutas'    && <SectionRutas />}
          {activeSection === 'progreso' && <SectionProgreso />}
          {activeSection === 'perfil'   && <SectionPerfil userName={userName} userEmail={userEmail} initials={initials} />}
        </div>
      </main>
    </div>
  );
};

// ─── SECCIÓN: INICIO ───
const SectionInicio = ({ userName, initials, setActiveSection }) => {
  const actividadReciente = [
    { color: '#00f5a0', texto: 'Completaste el módulo "Fundamentos de Python"', tiempo: 'Hace 1 hora' },
    { color: '#00c3ff', texto: 'Nueva insignia desbloqueada: Desarrollador Junior', tiempo: 'Hace 3 horas' },
    { color: '#a78bfa', texto: 'Subiste al nivel 3 en la ruta de Desarrollo Web', tiempo: 'Ayer' },
  ];

  return (
    <div className="est-section-content">
      <div className="est-welcome-card">
        <div className="est-welcome-text">
          <p className="est-welcome-sub">Bienvenido de nuevo,</p>
          <h2 className="est-welcome-name">{userName}</h2>
          <span className="est-level-badge">Nivel 3</span>
        </div>
        <div className="est-welcome-avatar">{initials}</div>
      </div>

      <div className="est-metrics-grid">
        <div className="est-metric-card cyan" onClick={() => setActiveSection('cursos')} style={{cursor: 'pointer'}}>
          <IconBook />
          <div><span className="est-metric-value">4</span><span className="est-metric-label">Cursos activos</span></div>
        </div>
        <div className="est-metric-card green">
          <IconChart />
          <div><span className="est-metric-value">68%</span><span className="est-metric-label">Progreso general</span></div>
        </div>
        <div className="est-metric-card purple" onClick={() => setActiveSection('rutas')} style={{cursor: 'pointer'}}>
          <IconMap />
          <div><span className="est-metric-value">2</span><span className="est-metric-label">Rutas activas</span></div>
        </div>
        <div className="est-metric-card orange">
          <IconStar />
          <div><span className="est-metric-value">1.240</span><span className="est-metric-label">XP acumulados</span></div>
        </div>
      </div>

      <div className="est-block">
        <h3 className="est-block-title">Actividad reciente</h3>
        <div className="est-activity-list">
          {actividadReciente.map((item, i) => (
            <div key={i} className="est-activity-item">
              <span className="est-activity-dot" style={{ background: item.color }} />
              <div><p className="est-activity-text">{item.texto}</p><p className="est-activity-time">{item.tiempo}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SECCIÓN: MIS CURSOS ───
const SectionCursos = () => {
  const cursos = [
    { nombre: 'Python Desde Cero', docente: 'Carlos Mendez', progreso: 62, modulos: 8, completados: 5, color: '#00f5a0', tag: 'En progreso' },
    { nombre: 'Bases de Datos SQL', docente: 'Ana Torres', progreso: 30, modulos: 6, completados: 2, color: '#00c3ff', tag: 'En progreso' },
    { nombre: 'HTML & CSS Profesional', docente: 'Luis Ríos', progreso: 100, modulos: 5, completados: 5, color: '#a78bfa', tag: 'Completado' },
    { nombre: 'Introducción a Redes', docente: 'María García', progreso: 0, modulos: 7, completados: 0, color: '#fb923c', tag: 'No iniciado' },
  ];

  return (
    <div className="est-section-content">
      <div className="est-courses-grid">
        {cursos.map((curso, i) => (
          <div key={i} className="est-course-card">
            <div className="est-course-top" style={{ borderColor: curso.color }}>
              <span className="est-course-tag" style={{ color: curso.color, borderColor: curso.color }}>{curso.tag}</span>
              <h4 className="est-course-name">{curso.nombre}</h4>
              <p className="est-course-docente">Docente: {curso.docente}</p>
            </div>
            <div className="est-course-bottom">
              <div className="est-progress-bar-wrap">
                <div className="est-progress-bar" style={{ width: `${curso.progreso}%`, background: curso.color }} />
              </div>
              <div className="est-course-meta">
                <span>{curso.completados}/{curso.modulos} módulos</span>
                <span style={{ color: curso.color }}>{curso.progreso}%</span>
              </div>
              <button className="est-btn-outline" style={{ borderColor: curso.color, color: curso.color }}>
                {curso.progreso === 0 ? 'Comenzar' : curso.progreso === 100 ? 'Revisar' : 'Continuar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SECCIÓN: RUTAS ───
const SectionRutas = () => {
  const rutas = [
    { nombre: 'Desarrollo Web Full Stack', progreso: 45, color: '#00f5a0', duracion: '6 meses', etapas: 6 },
    { nombre: 'Analista de Datos', progreso: 20, color: '#00c3ff', duracion: '4 meses', etapas: 5 },
  ];

  return (
    <div className="est-section-content">
      <div className="est-rutas-grid">
        {rutas.map((ruta, i) => (
          <div key={i} className="est-ruta-card" style={{ borderLeft: `4px solid ${ruta.color}` }}>
            <h4>{ruta.nombre}</h4>
            <p>Duración estimada: {ruta.duracion}</p>
            <div className="est-progress-bar-wrap">
              <div className="est-progress-bar" style={{ width: `${ruta.progreso}%`, background: ruta.color }} />
            </div>
            <span>{ruta.progreso}% completado</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SECCIÓN: PROGRESO ───
const SectionProgreso = () => (
  <div className="est-section-content">
    <div className="est-perfil-card">
      <h3 className="est-block-title"><IconChart /> Estadísticas de Aprendizaje</h3>
      <p>Has completado 12 módulos este mes. ¡Sigue así!</p>
    </div>
  </div>
);

// ─── SECCIÓN: PERFIL ───
const SectionPerfil = ({ userName, userEmail, initials }) => {
  const [pass, setPass] = useState({ actual: '', nueva: '', confirmar: '' });
  const [passMsg, setPassMsg] = useState('');
  const [showPass, setShowPass] = useState({ actual: false, nueva: false, confirmar: false });

  const handlePassSave = async () => {
    setPassMsg('');
    if (!pass.actual || !pass.nueva || pass.nueva !== pass.confirmar) {
      setPassMsg('err:Las contraseñas no coinciden o campos vacíos.');
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8000/api/usuarios/cambiar-password-perfil/', 
        { password_actual: pass.actual, nueva_password: pass.nueva },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPassMsg('ok:Contraseña actualizada correctamente.');
      setPass({ actual: '', nueva: '', confirmar: '' });
    } catch (err) {
      setPassMsg(`err:${err.response?.data?.error || "Error de conexión"}`);
    }
  };

  return (
    <div className="est-section-content">
      <div className="est-perfil-card">
        <div className="est-perfil-top">
          <div className="est-avatar-lg">{initials}</div>
          <div><h2 className="est-perfil-nombre">{userName}</h2><p className="est-perfil-email">{userEmail}</p></div>
        </div>
        <hr className="est-divider" />
        <h3 className="est-block-title"><IconLock /> Seguridad</h3>
        <div className="est-pass-grid">
          {['actual', 'nueva', 'confirmar'].map((f) => (
            <div key={f} className="est-perfil-field">
              <label className="est-label-mini">{f === 'actual' ? 'Actual' : f === 'nueva' ? 'Nueva' : 'Confirmar'}</label>
              <div className="est-input-wrapper">
                <input 
                  type={showPass[f] ? 'text' : 'password'} 
                  value={pass[f]} 
                  onChange={(e) => setPass({...pass, [f]: e.target.value})} 
                  className="est-input-dark" 
                />
                <button type="button" onClick={() => setShowPass({...showPass, [f]: !showPass[f]})} className="est-eye-btn"><IconEye /></button>
              </div>
            </div>
          ))}
        </div>
        {passMsg && <div className={`est-msg ${passMsg.startsWith('ok') ? 'ok' : 'err'}`} style={{marginTop:'10px'}}>{passMsg.split(':')[1]}</div>}
        <button className="est-btn-primary" onClick={handlePassSave} style={{marginTop: '20px'}}><IconSave /> Actualizar contraseña</button>
      </div>
    </div>
  );
};

export default HomeEstudiante;