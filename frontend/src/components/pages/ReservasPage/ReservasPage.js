import React, { useState } from 'react';
import './ReservasPage.css';

function ReservasPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '19:00',
    personas: 2,
    notas: ''
  });

  const horasDisponibles = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Reserva confirmada para ${formData.nombre}!\nFecha: ${formData.fecha}\nHora: ${formData.hora}\nPersonas: ${formData.personas}`);
    // Aquí después iría la llamada a la API
  };

  return (
    <div className="reservas-page">
      <div className="page-header">
        <h1>📅 Reservar Mesa en Don Franccesco</h1>
        <p>Reserve su mesa para una experiencia italiana inolvidable</p>
      </div>

      <div className="reservas-content">
        <div className="reservas-info">
          <div className="info-card">
            <div className="info-icon">🍝</div>
            <h3>Experiencia Italiana</h3>
            <p>Disfrute de auténtica cocina italiana en un ambiente familiar</p>
          </div>

          <div className="info-card">
            <div className="info-icon">🕒</div>
            <h3>Horarios Disponibles</h3>
            <p>Lun-Dom: 12:00 - 15:00 / 19:00 - 23:00</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>¿Necesita ayuda?</h3>
            <p>Llámenos: (123) 456-7890</p>
          </div>
        </div>

        <form className="reserva-form" onSubmit={handleSubmit}>
          <h2>Formulario de Reserva</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ejemplo@email.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="(123) 456-7890"
              />
            </div>

            <div className="form-group">
              <label htmlFor="personas">Número de Personas *</label>
              <select
                id="personas"
                name="personas"
                value={formData.personas}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fecha">Fecha *</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="hora">Hora *</label>
              <select
                id="hora"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                required
              >
                {horasDisponibles.map(hora => (
                  <option key={hora} value={hora}>{hora}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas Especiales</label>
            <textarea
              id="notas"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              placeholder="Alergias, celebraciones especiales, preferencias..."
              rows="3"
            />
          </div>

          <button type="submit" className="submit-btn">
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservasPage;

