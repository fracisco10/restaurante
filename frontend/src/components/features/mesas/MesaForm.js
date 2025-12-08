import React, { useState, useEffect } from 'react';

const MesaForm = ({ mesa, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    numero: '',
    capacidad: '',
    ubicacion: '',
    estado: 'DISPONIBLE'
  });

  // Si estamos editando, cargar los datos de la mesa
  useEffect(() => {
    if (mesa) {
      setFormData({
        numero: mesa.numero || '',
        capacidad: mesa.capacidad || '',
        ubicacion: mesa.ubicacion || '',
        estado: mesa.estado || 'DISPONIBLE'
      });
    }
  }, [mesa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.numero || !formData.capacidad) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    // Convertir capacidad a número
    const mesaData = {
      ...formData,
      capacidad: parseInt(formData.capacidad)
    };

    onSubmit(mesaData);
  };

  return (
    <div className="mesa-form-overlay">
      <div className="mesa-form-container">
        <h2>{mesa ? 'Editar Mesa' : 'Nueva Mesa'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="numero">Número de Mesa *</label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="capacidad">Capacidad (personas) *</label>
            <input
              type="number"
              id="capacidad"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
              min="1"
              max="20"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ubicacion">Ubicación</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              placeholder="Ej: Terraza, Interior, Barra..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            >
              <option value="DISPONIBLE">Disponible</option>
              <option value="OCUPADA">Ocupada</option>
              <option value="RESERVADA">Reservada</option>
              <option value="MANTENIMIENTO">Mantenimiento</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {mesa ? 'Actualizar' : 'Crear'} Mesa
            </button>
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MesaForm;
