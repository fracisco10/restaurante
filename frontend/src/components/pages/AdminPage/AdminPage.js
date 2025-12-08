import React from 'react';
import './AdminPage.css';

function AdminPage() {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>⚙️ Panel Administrativo</h1>
        <p>Configuración y gestión completa del sistema</p>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-icon">👥</div>
          <h3>Usuarios</h3>
          <p>Gestión de empleados y permisos</p>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">📊</div>
          <h3>Reportes</h3>
          <p>Estadísticas y análisis</p>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">⚙️</div>
          <h3>Configuración</h3>
          <p>Ajustes del sistema</p>
        </div>

        <div className="admin-card">
          <div className="admin-card-icon">🔒</div>
          <h3>Seguridad</h3>
          <p>Control de acceso</p>
        </div>
      </div>

      <div className="admin-notes">
        <p><strong>Nota:</strong> Esta sección está en desarrollo. Las funcionalidades completas estarán disponibles próximamente.</p>
      </div>
    </div>
  );
}

export default AdminPage;

