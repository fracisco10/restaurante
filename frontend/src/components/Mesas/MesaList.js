import React, { useState, useEffect } from 'react';
import MesaCard from './MesaCard';
import MesaForm from './MesaForm';
import mesaService from '../../services/mesaService';

const MesaList = () => {
  const [mesas, setMesas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMesa, setEditingMesa] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar mesas al iniciar
  useEffect(() => {
    loadMesas();
  }, []);

  const loadMesas = async () => {
    setLoading(true);
    const mesasData = await mesaService.getMesas();
    setMesas(mesasData);
    setLoading(false);
  };

  const handleCreateMesa = async (mesaData) => {
    await mesaService.createMesa(mesaData);
    setShowForm(false);
    loadMesas();
  };

  const handleUpdateMesa = async (mesaData) => {
    await mesaService.updateMesa(editingMesa.id, mesaData);
    setEditingMesa(null);
    setShowForm(false);
    loadMesas();
  };

  const handleDeleteMesa = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta mesa?')) {
      await mesaService.deleteMesa(id);
      loadMesas();
    }
  };

  const handleToggleStatus = async (id) => {
    const mesa = mesas.find(m => m.id === id);
    const nuevoEstado = mesa.estado === 'DISPONIBLE' ? 'OCUPADA' : 'DISPONIBLE';

    await mesaService.updateMesa(id, { ...mesa, estado: nuevoEstado });
    loadMesas();
  };

  const handleEdit = (mesa) => {
    setEditingMesa(mesa);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMesa(null);
  };

  if (loading) {
    return <div className="loading">Cargando mesas...</div>;
  }

  return (
    <div className="mesa-list-container">
      <div className="mesa-list-header">
        <h1>Gestión de Mesas</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-add-mesa"
        >
          + Nueva Mesa
        </button>
      </div>

      {showForm && (
        <MesaForm
          mesa={editingMesa}
          onSubmit={editingMesa ? handleUpdateMesa : handleCreateMesa}
          onCancel={handleCancel}
        />
      )}

      <div className="mesas-grid">
        {mesas.length === 0 ? (
          <p>No hay mesas registradas</p>
        ) : (
          mesas.map(mesa => (
            <MesaCard
              key={mesa.id}
              mesa={mesa}
              onEdit={handleEdit}
              onDelete={handleDeleteMesa}
              onToggleStatus={handleToggleStatus}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MesaList;
