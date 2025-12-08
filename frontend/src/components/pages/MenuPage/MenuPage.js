import React from 'react';
import './MenuPage.css';

function MenuPage() {
  return (
    <div className="menu-page">
      <div className="page-header">
        <h1>📋 Menú Digital</h1>
        <p>Explora nuestra carta completa de platillos y bebidas</p>
      </div>

      <div className="coming-soon">
        <div className="coming-soon-icon">🚧</div>
        <h2>Página en Construcción</h2>
        <p>Estamos trabajando en nuestro menú digital. Próximamente disponible.</p>
        <div className="features-list">
          <div className="feature">
            <span className="feature-icon">🍕</span>
            <span>Categorías organizadas</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📸</span>
            <span>Fotos de cada platillo</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💰</span>
            <span>Precios actualizados</span>
          </div>
        </div>
      </div>
    </div>
  );
}



export default MenuPage;