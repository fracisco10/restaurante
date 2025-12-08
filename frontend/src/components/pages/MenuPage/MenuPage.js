import React, { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { categorias } from '../../../data/menuData';
import apiService from '../../../services/api';
import './MenuPage.css';

const MenuPage = () => {
  const [categoriaActiva, setCategoriaActiva] = useState(1);
  const [busqueda, setBusqueda] = useState('');
  const [platillos, setPlatillos] = useState([]);
  const [platillosFiltrados, setPlatillosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [conexionStatus, setConexionStatus] = useState('checking');
  const { addToCart } = useCart();

  useEffect(() => {
    cargarMenu();
  }, []);

  const cargarMenu = async () => {
    setCargando(true);
    setConexionStatus('checking');
    
    try {
      // Primero verificar conexión
      const connection = await apiService.checkConnection();
      
      if (connection.connected) {
        setConexionStatus('connected');
        
        // Obtener menú del backend
        try {
          const menuData = await apiService.getMenu();
          console.log('📦 Datos recibidos del backend:', menuData);
          
          // El backend devuelve { platillos: [], ... }
          const platillosBackend = menuData.platillos || [];
          
          setPlatillos(platillosBackend);
          setPlatillosFiltrados(platillosBackend);
          
        } catch (menuError) {
          console.log('⚠️ Error obteniendo menú:', menuError);
          setConexionStatus('error');
          // Aquí podríamos cargar datos locales si el backend falla
        }
      } else {
        setConexionStatus('disconnected');
        console.log('📁 Backend no disponible');
      }
    } catch (error) {
      console.error('❌ Error cargando menú:', error);
      setConexionStatus('error');
    } finally {
      setCargando(false);
    }
  };

  const filtrarPorCategoria = (categoriaId) => {
    setCategoriaActiva(categoriaId);
    
    if (categoriaId === 'todos') {
      setPlatillosFiltrados(platillos);
    } else {
      setPlatillosFiltrados(
        platillos.filter(platillo => platillo.categoriaId === categoriaId)
      );
    }
  };

  const filtrarPorBusqueda = (texto) => {
    setBusqueda(texto);
    
    if (texto.trim() === '') {
      filtrarPorCategoria(categoriaActiva);
    } else {
      const filtrados = platillos.filter(platillo =>
        platillo.nombre.toLowerCase().includes(texto.toLowerCase()) ||
        platillo.descripcion.toLowerCase().includes(texto.toLowerCase()) ||
        (platillo.ingredientes && platillo.ingredientes.some(ing => 
          ing.toLowerCase().includes(texto.toLowerCase())
        ))
      );
      setPlatillosFiltrados(filtrados);
    }
  };

  const handleAddToCart = (platillo) => {
    addToCart(platillo);
    
    // Notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: linear-gradient(135deg, #C41E3A, #A0152E);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
      <strong>¡${platillo.nombre} agregado al carrito!</strong>
      <p style="margin: 5px 0 0 0; font-size: 0.9em;">$${platillo.precio?.toFixed(2) || '0.00'}</p>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const getConexionStatusText = () => {
    switch (conexionStatus) {
      case 'connected': return '✅ Conectado al backend';
      case 'disconnected': return '❌ Backend no disponible';
      case 'checking': return '🔄 Verificando conexión...';
      case 'error': return '⚠️ Error de conexión';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="menu-page">
      {/* Header */}
      <div className="menu-header">
        <h1>🍝 Menú Digital Don Franccesco</h1>
        <p className="menu-subtitle">Auténtica cocina italiana preparada con pasión</p>
        
        {/* Estado de conexión */}
        <div className="connection-status-banner">
          <div className={`status-indicator ${conexionStatus}`}>
            {getConexionStatusText()}
          </div>
          <button 
            className="refresh-btn"
            onClick={cargarMenu}
            disabled={cargando}
          >
            {cargando ? '🔄 Actualizando...' : '🔄 Actualizar'}
          </button>
        </div>
        
        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar platillos o ingredientes..."
            value={busqueda}
            onChange={(e) => filtrarPorBusqueda(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* Categorías */}
      <div className="categorias-container">
        <div className="categorias-header">
          <h2>Categorías</h2>
          <button 
            className={`categoria-btn ${categoriaActiva === 'todos' ? 'active' : ''}`}
            onClick={() => filtrarPorCategoria('todos')}
          >
            Todos
          </button>
        </div>
        
        <div className="categorias-grid">
          {categorias.map(categoria => (
            <button
              key={categoria.id}
              className={`categoria-card ${categoriaActiva === categoria.id ? 'active' : ''}`}
              onClick={() => filtrarPorCategoria(categoria.id)}
            >
              <span className="categoria-icon">{categoria.icono}</span>
              <div className="categoria-info">
                <h3>{categoria.nombre}</h3>
                <p>{categoria.descripcion}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Platillos */}
      <div className="platillos-section">
        <div className="section-header">
          <h2 className="platillos-title">
            {categoriaActiva === 'todos' 
              ? 'Todos los Platillos' 
              : categorias.find(c => c.id === categoriaActiva)?.nombre}
            <span className="platillos-count"> ({platillosFiltrados.length})</span>
          </h2>
          <div className="price-range">
            Precio promedio: $
            {platillosFiltrados.length > 0
              ? (platillosFiltrados.reduce((sum, p) => sum + (p.precio || 0), 0) / platillosFiltrados.length).toFixed(2)
              : '0.00'}
          </div>
        </div>

        {cargando ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando menú del restaurante...</p>
          </div>
        ) : (
          <>
            <div className="platillos-grid">
              {platillosFiltrados.map(platillo => (
                <div key={platillo.id} className="platillo-card">
                  {platillo.destacado && <div className="badge-destacado">🌟 Destacado</div>}
                  
                  <div className="platillo-image-container">
                    <img 
                      src={platillo.imagen || 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'} 
                      alt={platillo.nombre}
                      className="platillo-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
                      }}
                    />
                  </div>
                  
                  <div className="platillo-content">
                    <div className="platillo-header">
                      <h3 className="platillo-nombre">{platillo.nombre}</h3>
                      <span className="platillo-precio">${platillo.precio?.toFixed(2) || '0.00'}</span>
                    </div>
                    
                    <p className="platillo-descripcion">{platillo.descripcion}</p>
                    
                    <div className="platillo-details">
                      <div className="platillo-ingredientes">
                        <strong>Ingredientes:</strong> {
                          Array.isArray(platillo.ingredientes) 
                            ? platillo.ingredientes.join(', ')
                            : platillo.ingredientes || 'No especificados'
                        }
                      </div>
                      <div className="platillo-tiempo">
                        ⏱️ {platillo.tiempoPreparacion || 20} min
                      </div>
                    </div>
                    
                    <div className="platillo-actions">
                      <button 
                        className="btn-add-to-carrito"
                        onClick={() => handleAddToCart(platillo)}
                      >
                        🛒 Añadir al carrito
                      </button>
                      <button 
                        className="btn-view-details"
                        onClick={() => alert(`🍝 ${platillo.nombre}\n\n📖 ${platillo.descripcion}\n\n💰 $${platillo.precio?.toFixed(2) || '0.00'}`)}
                      >
                        👁️ Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {platillosFiltrados.length === 0 && !cargando && (
              <div className="no-results">
                <p>😕 No encontramos platillos con "{busqueda}"</p>
                <button 
                  className="btn-clear-search"
                  onClick={() => {
                    setBusqueda('');
                    filtrarPorCategoria('todos');
                  }}
                >
                  Ver todo el menú ({platillos.length} platillos)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Información adicional */}
      <div className="info-adicional">
        <div className="info-card">
          <h3>ℹ️ Información Importante</h3>
          <ul>
            <li>🎯 Todos nuestros platillos se preparan al momento</li>
            <li>🌱 Contamos con opciones vegetarianas</li>
            <li>⏰ Tiempo estimado de preparación: 20-40 minutos</li>
            <li>📞 Para pedidos especiales: +52 55 1234 5678</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h3>📱 También disponible</h3>
          <p>Descarga nuestra app para:</p>
          <ul>
            <li>📲 Pedidos más rápidos</li>
            <li>💳 Pago con tarjeta</li>
            <li>⭐ Programa de puntos</li>
            <li>📅 Reservas en línea</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default MenuPage;
