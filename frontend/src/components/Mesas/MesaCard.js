import React from 'react';

const MesaCard = ({ mesa, onEdit, onDelete, onToggleStatus }) => {
  const { id, numero, capacidad, estado, ubicacion } = mesa;

  return (
    <div className={`mesa-card ${estado?.toLowerCase()}`}>
      <div className="mesa-header">
        <h3>Mesa {numero}</h3>
        <span className={`estado-badge ${estado?.toLowerCase()}`}>
          {estado}
        </span>
      </div>

      <div className="mesa-info">
        <p><strong>Capacidad:</strong> {capacidad} personas</p>
        <p><strong>Ubicación:</strong> {ubicacion || 'Sin ubicación'}</p>
      </div>

      <div className="mesa-actions">
        <button
          onClick={() => onToggleStatus(id)}
          className={`btn-status ${estado === 'DISPONIBLE' ? 'ocupar' : 'liberar'}`}
        >
          {estado === 'DISPONIBLE' ? 'Ocupar' : 'Liberar'}
        </button>

        <button onClick={() => onEdit(mesa)} className="btn-edit">
          Editar
        </button>

        <button onClick={() => onDelete(id)} className="btn-delete">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default MesaCard;

