import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/mesas', label: 'Gestión de Mesas', icon: '🪑' },
    { path: '/pagos', label: 'Sistema de Pagos', icon: '💳' },
    { path: '/chatbot', label: 'Asistente Virtual', icon: '💬' },
    { path: '/menu', label: 'Menú Digital', icon: '📋' },
  ];

  const contactInfo = [
    { icon: '📧', text: 'soporte@restauranteapp.com' },
    { icon: '📞', text: '+1 (234) 567-8900' },
    { icon: '🏢', text: 'Av. Principal 123, Ciudad' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección Superior */}
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🍽️</span>
              <h3 className="footer-logo-text">Don Franccesco</h3>
            </div>
            <p className="footer-tagline">
              Sistema integral de gestión para restaurantes modernos
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">🐦</a>
              <a href="#" className="social-link" aria-label="Facebook">📘</a>
              <a href="#" className="social-link" aria-label="Instagram">📸</a>
              <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          <div className="footer-links-section">
            <h4 className="footer-section-title">Enlaces Rápidos</h4>
            <div className="footer-links-grid">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.path} className="footer-link">
                  <span className="footer-link-icon">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer-contact">
            <h4 className="footer-section-title">Contacto</h4>
            <div className="contact-info">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-item">
                  <span className="contact-icon">{info.icon}</span>
                  <span className="contact-text">{info.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-newsletter">
            <h4 className="footer-section-title">Noticias</h4>
            <p className="newsletter-text">
              Suscríbete para recibir actualizaciones del sistema
            </p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="newsletter-input"
              />
              <button className="newsletter-btn">→</button>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="footer-divider"></div>

        {/* Sección Inferior */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© {currentYear} Restaurante App. Todos los derechos reservados.</p>
            <div className="legal-links">
              <Link to="/privacidad" className="legal-link">Política de Privacidad</Link>
              <span className="separator">•</span>
              <Link to="/terminos" className="legal-link">Términos de Servicio</Link>
              <span className="separator">•</span>
              <Link to="/cookies" className="legal-link">Cookies</Link>
            </div>
          </div>

          <div className="footer-tech">
            <span className="tech-label">Desarrollado con:</span>
            <div className="tech-stack">
              <span className="tech-item">React</span>
              <span className="tech-item">Node.js</span>
              <span className="tech-item">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;