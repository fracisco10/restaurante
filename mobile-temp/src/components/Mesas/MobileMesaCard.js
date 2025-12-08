import React from 'react';
import './MobileMesaCard.css'; // ← Importa el CSS

const MobileMesaCard = ({ mesa, onMesaStateChange }) => {
  const { id, nombre, estado, capacidad } = mesa;

  const handleEstadoChange = async (nuevoEstado) => {
    try {
      // Aquí iría la llamada real al servicio
      console.log(`Cambiando mesa ${id} a estado: ${nuevoEstado}`);

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      onMesaStateChange(); // Recargar mesas
    } catch (error) {
      alert('Error al actualizar el estado de la mesa');
    }
  };

  const handleOcupar = () => handleEstadoChange('ocupada');
  const handleLiberar = () => handleEstadoChange('libre');
  const handlePagar = () => handleEstadoChange('pagando');

  const getEstadoClass = () => {
    switch (estado) {
      case 'ocupada': return 'estado-ocupada';
      case 'libre': return 'estado-libre';
      case 'pagando': return 'estado-pagando';
      default: return 'estado-libre';
    }
  };

  const getEstadoText = () => {
    switch (estado) {
      case 'ocupada': return 'Ocupada';
      case 'libre': return 'Libre';
      case 'pagando': return 'Pagando';
      default: return 'Libre';
    }
  };

  // Determinar si la mesa necesita atención urgente
  const needsAttention = estado === 'pagando';

  return (
    <div className={`mobile-mesa-card ${needsAttention ? 'mesa-card-urgent' : ''}`}>
      {/* Notificación para mesas que necesitan atención */}
      {needsAttention && <div className="mesa-notification"></div>}

      <div className="card-header">
        <div className="mesa-info">
          <h3 className="mesa-nombre">Mesa {nombre}</h3>
          <div className="mesa-capacidad">
            Capacidad:
            <span className="capacidad-badge">{capacidad} personas</span>
          </div>
        </div>

        <div className="estado-container">
          <div className={`estado-indicator ${getEstadoClass()}`}>
            <span className="estado-text">{getEstadoText()}</span>
          </div>
          <div className="mesa-id">ID: {id}</div>
        </div>
      </div>

      <div className="actions-container">
        {estado === 'libre' && (
          <button className="btn-ocupar" onClick={handleOcupar}>
            🍽️ Ocupar
          </button>
        )}

        {estado === 'ocupada' && (
          <>
            <button className="btn-liberar" onClick={handleLiberar}>
              🚪 Liberar
            </button>
            <button className="btn-pagar" onClick={handlePagar}>
              💳 Pagar
            </button>
          </>
        )}

        {estado === 'pagando' && (
          <button className="btn-liberar" onClick={handleLiberar}>
            ✅ Finalizar
          </button>
        )}
      </div>

      {/* Timestamp opcional para mesas ocupadas */}
      {estado === 'ocupada' && (
        <div className="mesa-timestamp">
          Ocupada desde: {new Date().toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default MobileMesaCard;
