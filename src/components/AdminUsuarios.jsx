import React from 'react';

const AdminUsuarios = ({ usuarios = [], eliminarUsuario }) => {
    return (
        <div className="na-table-container na-fade-in">
            <div className="na-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="na-section-title" style={{ margin: 0, color: '#fff' }}>
                    Gestión de Usuarios
                </h2>
                <button className="na-btn-approve" style={{ padding: '8px 20px' }}>
                    + Nuevo Usuario
                </button>
            </div>

            <div className="na-table-wrapper">
                <table className="na-table">
                    <thead>
                        <tr>
                            <th className="na-th">Usuario</th>
                            <th className="na-th">Correo Electrónico</th>
                            <th className="na-th">Rol</th>
                            <th className="na-th">Estado</th>
                            <th className="na-th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (
                            usuarios.map((user) => (
                                <tr key={user.id} className="na-table-row">
                                    <td className="na-td">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div className="na-avatar-circle" style={{ width: '30px', height: '30px', fontSize: '10px' }}>
                                                {user.nombre.substring(0, 2).toUpperCase()}
                                            </div>
                                            {user.nombre}
                                        </div>
                                    </td>
                                    <td className="na-td" style={{ color: '#7a8ba8' }}>{user.email}</td>
                                    <td className="na-td">
                                        <span className="na-specialty-tag" style={{ borderColor: 'rgba(0, 229, 255, 0.3)', color: '#00e5ff' }}>
                                            {user.rol}
                                        </span>
                                    </td>
                                    <td className="na-td">
                                        <span style={{ 
                                            display: 'inline-block', 
                                            width: '8px', 
                                            height: '8px', 
                                            borderRadius: '50%', 
                                            background: '#a3ff4f', 
                                            marginRight: '8px',
                                            boxShadow: '0 0 8px #a3ff4f'
                                        }}></span>
                                        Activo
                                    </td>
                                    <td className="na-td">
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="na-nav-item" style={{ padding: '4px 8px', fontSize: '12px', width: 'auto', background: 'rgba(255,255,255,0.05)' }}>
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => eliminarUsuario(user.id)}
                                                className="na-btn-reject" 
                                                style={{ padding: '4px 8px' }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="na-empty-msg">
                                    No hay usuarios registrados en la base de datos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsuarios;