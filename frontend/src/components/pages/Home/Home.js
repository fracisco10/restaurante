import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  // Estadísticas para Don Franccesco
  const stats = [
    {
      icon: '👨‍🍳',
      label: 'Años de Tradición',
      value: '30+',
      trend: 'Desde 1995',
      color: '#D4AF37'
    },
    {
      icon: '🍝',
      label: 'Platillos Secretos',
      value: '15',
      trend: 'Recetas familiares',
      color: '#C41E3A'
    },
    {
      icon: '⭐',
      label: 'Calificación',
      value: '4.9/5',
      trend: '+0.1',
      color: '#FFD700'
    },
    {
      icon: '🍷',
      label: 'Vinos Italianos',
      value: '80+',
      trend: 'Selección premium',
      color: '#8B4513'
    },
  ];

  // Especialidades de Don Franccesco
  const specialties = [
    {
      name: 'Lasagna della Nonna',
      desc: 'Receta secreta de la abuela Franccesco',
      price: '$16.99',
      icon: '🍝',
      badge: '⭐ Más vendido'
    },
    {
      name: 'Osso Buco Milanese',
      desc: 'Brasato con gremolata y risotto',
      price: '$24.50',
      icon: '🍖',
      badge: '👑 Especialidad'
    },
    {
      name: 'Tiramisú Originale',
      desc: 'Preparado con mascarpone italiano',
      price: '$8.99',
      icon: '🍰',
      badge: '❤️ Favorito'
    },
    {
      name: 'Vino Brunello',
      desc: 'Toscana DOCG - Reserva familiar',
      price: '$12.50',
      icon: '🍷',
      badge: '🏆 Premio'
    },
  ];

  // Eventos en Don Franccesco
  const events = [
    { day: 'Lunes', event: 'Noche de Pasta Fresca', time: '7 PM', icon: '🍝' },
    { day: 'Miércoles', event: 'Degustación de Vinos', time: '8 PM', icon: '🍷' },
    { day: 'Viernes', event: 'Cena con Música en Vivo', time: '7 PM', icon: '🎵' },
    { day: 'Domingo', event: 'Brunch Italiano Familiar', time: '11 AM', icon: '👨‍👩‍👧‍👦' },
  ];

  // Testimonios
  const testimonials = [
    {
      text: '"La mejor pasta que he probado fuera de Italia. ¡Don Franccesco es un genio!"',
      author: 'María González',
      role: 'Crítica gastronómica'
    },
    {
      text: '"Ambiente familiar y acogedor. Las recetas secretas son increíbles."',
      author: 'Carlos Rodríguez',
      role: 'Cliente frecuente'
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section con logo Don Franccesco */}
      <div className="hero-donfranccesco">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="logo-container">
            <h1 className="restaurant-name">Don Franccesco</h1>
            <div className="title-decoration">
              <span className="line"></span>
              <span className="icon">🍝</span>
              <span className="line"></span>
            </div>
            <p className="restaurant-tagline">
              Auténtica Cocina Italiana · Tradición Familiar desde 1995
            </p>
          </div>

          <div className="hero-actions">
            <Link to="/menu" className="btn btn-gold">
              <span className="btn-icon">📖</span>
              Descubrir Nuestro Menú
            </Link>
            <Link to="/reservas" className="btn btn-transparent">
              <span className="btn-icon">📅</span>
              Reservar una Mesa
            </Link>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>↓</span>
        </div>
      </div>

      {/* Sección de Bienvenida */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2 className="section-title">
            <span className="title-icon">👋</span>
            Benvenuti a Don Franccesco
          </h2>
          <div className="welcome-text">
            <p>
              Por más de 30 años, nuestra familia ha compartido los sabores auténticos
              de la Toscana con nuestra comunidad. Cada platillo cuenta una historia,
              cada ingrediente es seleccionado con amor, y cada cliente es tratado
              como parte de nuestra famiglia.
            </p>
            <p className="signature">
              Con amore,<br />
              <strong>Don Franccesco y Familia</strong>
            </p>
          </div>
        </div>
        <div className="welcome-image">
          {/* Imagen decorativa */}
          <div className="image-placeholder">🍷🍝🥖</div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="stats-section">
        <h2 className="section-title">
          <span className="title-icon">📊</span>
          Nuestra Tradición en Números
        </h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3>{stat.label}</h3>
                <div className="stat-main">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-trend">{stat.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Especialidades del Chef */}
      <section className="specialties-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-icon">👨‍🍳</span>
            Especialidades del Chef Franccesco
          </h2>
          <p className="section-subtitle">
            Recetas familiares transmitidas por generaciones
          </p>
        </div>

        <div className="specialties-grid">
          {specialties.map((item, index) => (
            <div key={index} className="specialty-card">
              <div className="specialty-badge">{item.badge}</div>
              <div className="specialty-icon">{item.icon}</div>
              <div className="specialty-content">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="specialty-footer">
                  <span className="price">{item.price}</span>
                  <button className="order-btn">
                    <span className="order-icon">+</span>
                    Ordenar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid Principal de Gestión */}
      <section className="management-section">
        <h2 className="section-title">
          <span className="title-icon">⚙️</span>
          Gestión del Restaurante
        </h2>

        <div className="management-grid">
          {/* Mesas */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon">🪑</div>
              <h3>Gestión de Mesas</h3>
            </div>
            <p>Controla el estado y disponibilidad de todas las mesas del restaurante</p>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-value">8/15</span>
                <span className="stat-label">Ocupadas</span>
              </div>
              <div className="stat">
                <span className="stat-value">4</span>
                <span className="stat-label">Reservadas</span>
              </div>
            </div>
            <Link to="/mesas" className="card-link">
              Gestionar Mesas →
            </Link>
          </div>

          {/* Pagos */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon">💳</div>
              <h3>Sistema de Pagos</h3>
            </div>
            <p>Procesa pagos y genera facturas para los clientes</p>
            <div className="card-stats">
              <div className="stat">
                <span className="stat-value">$1,250</span>
                <span className="stat-label">Ventas hoy</span>
              </div>
              <div className="stat">
                <span className="stat-value">24</span>
                <span className="stat-label">Transacciones</span>
              </div>
            </div>
            <Link to="/pagos" className="card-link">
              Gestionar Pagos →
            </Link>
          </div>

          {/* Eventos */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon">📅</div>
              <h3>Eventos de la Semana</h3>
            </div>
            <div className="events-mini">
              {events.slice(0, 2).map((event, index) => (
                <div key={index} className="event-mini">
                  <span className="event-day">{event.day}</span>
                  <span className="event-name">{event.event}</span>
                  <span className="event-time">{event.time}</span>
                </div>
              ))}
            </div>
            <Link to="/eventos" className="card-link">
              Ver Calendario Completo →
            </Link>
          </div>

          {/* Asistente */}
          <div className="management-card">
            <div className="card-header">
              <div className="card-icon">💬</div>
              <h3>Asistente Virtual</h3>
            </div>
            <p>Atiende consultas y ayuda a los clientes automáticamente</p>
            <div className="assistant-stats">
              <div className="stat">
                <span className="stat-value">98%</span>
                <span className="stat-label">Satisfacción</span>
              </div>
              <div className="stat">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Disponible</span>
              </div>
            </div>
            <Link to="/chatbot" className="card-link">
              Abrir Asistente →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonials-section">
        <h2 className="section-title">
          <span className="title-icon">💬</span>
          Lo Que Dicen Nuestros Clientes
        </h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="quote-icon">❝</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="final-cta">
        <div className="cta-content">
          <h3>¿Listo para una experiencia italiana auténtica?</h3>
          <p>Reserva tu mesa en Don Franccesco y descubre por qué somos el restaurante italiano favorito de la ciudad.</p>
        </div>
        <div className="cta-buttons">
          <Link to="/reservas" className="cta-btn btn-gold">
            <span className="cta-icon">📞</span>
            Reservar por Teléfono
          </Link>
          <Link to="/reservas" className="cta-btn btn-outline">
            <span className="cta-icon">🌐</span>
            Reservar Online
          </Link>
          <Link to="/menu" className="cta-btn btn-transparent">
            <span className="cta-icon">📖</span>
            Ver Menú Completo
          </Link>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="contact-info-section">
        <div className="contact-item">
          <span className="contact-icon">📍</span>
          <div className="contact-details">
            <h4>Visítanos</h4>
            <p>Av. Italia 123, Ciudad</p>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">📞</span>
          <div className="contact-details">
            <h4>Llámanos</h4>
            <p>(123) 456-7890</p>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon">🕒</span>
          <div className="contact-details">
            <h4>Horarios</h4>
            <p>Lun-Dom: 12:00 - 23:00</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

