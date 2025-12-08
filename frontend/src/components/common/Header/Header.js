import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 Inicio', icon: '🏠' },
    { path: '/mesas', label: '🪑 Mesas', icon: '🪑' },
    { path: '/pagos', label: '💳 Pagos', icon: '💳' },
    { path: '/chatbot', label: '💬 Chatbot', icon: '💬' },
    { path: '/menu', label: '📋 Menú', icon: '📋' },
    { path: '/admin', label: '⚙️ Admin', icon: '⚙️' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo - CAMBIADO A DON FRANCCESCO */}
        <Link to="/" className="logo">
          <span className="logo-icon">🍝</span> {/* Cambiado de 🍽️ a 🍝 */}
          <h1 className="logo-text">Don Franccesco</h1> {/* CAMBIADO AQUÍ */}
        </Link>

        {/* Navegación */}
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Indicador de ruta actual - ACTUALIZADO PARA DON FRANCCESCO */}
        <div className="current-path">
          <span className="path-icon">📍</span>
          <span className="path-text">
            {location.pathname === '/' ? 'Dashboard Don Franccesco' : /* AÑADIDO */
             location.pathname === '/mesas' ? 'Gestión de Mesas' :
             location.pathname === '/pagos' ? 'Sistema de Pagos' :
             location.pathname === '/chatbot' ? 'Asistente Virtual' :
             location.pathname === '/menu' ? 'Menú Don Franccesco' : /* CAMBIADO */
             location.pathname === '/admin' ? 'Panel Administrativo' : 'Don Franccesco'} /* CAMBIADO */
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;

