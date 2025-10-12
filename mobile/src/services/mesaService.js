import axios from 'axios';

const API_URL = 'http://localhost:8081';  // ← SIN /api

const mesaService = {
  // Obtener todas las mesas del backend real
  getMesas: async () => {
    try {
      const response = await axios.get(`${API_URL}/mesas`);
      console.log('✅ Mesas cargadas del backend:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error cargando mesas:', error);
      // Fallback a datos de ejemplo si el backend no responde
      return [
        { id: 1, numero: 'M1', capacidad: 4, ubicacion: 'Terraza', estado: 'DISPONIBLE' },
        { id: 2, numero: 'M2', capacidad: 2, ubicacion: 'Interior', estado: 'OCUPADA' }
      ];
    }
  },

  // Crear nueva mesa en el backend
  createMesa: async (mesaData) => {
    try {
      const response = await axios.post(`${API_URL}/mesas`, mesaData);
      console.log('✅ Mesa creada:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creando mesa:', error);
      throw new Error('No se pudo crear la mesa');
    }
  },

  // Actualizar mesa en el backend
  updateMesa: async (id, mesaData) => {
    try {
      const response = await axios.put(`${API_URL}/mesas/${id}`, mesaData);
      console.log('✅ Mesa actualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error actualizando mesa:', error);
      throw new Error('No se pudo actualizar la mesa');
    }
  },

  // Eliminar mesa del backend
  deleteMesa: async (id) => {
    try {
      await axios.delete(`${API_URL}/mesas/${id}`);
      console.log('✅ Mesa eliminada:', id);
    } catch (error) {
      console.error('❌ Error eliminando mesa:', error);
      throw new Error('No se pudo eliminar la mesa');
    }
  }
}; // ← Esta llave CIERRA el objeto mesaService

// Servicio para pagos - Fuera del objeto mesaService
export const pagoService = {
  // Procesar pago en el backend
  procesarPago: async (pagoData) => {
    try {
      const response = await axios.post(`${API_URL}/pagos`, pagoData);
      console.log('✅ Pago procesado en backend:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error procesando pago:', error);
      throw new Error('Error al procesar el pago');
    }
  },

  // Obtener pagos por mesa
  obtenerPagosPorMesa: async (mesaId) => {
    try {
      const response = await axios.get(`${API_URL}/pagos/mesa/${mesaId}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo pagos:', error);
      return [];
    }
  }
};

export default mesaService;


