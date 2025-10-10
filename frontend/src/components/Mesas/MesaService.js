import axios from 'axios';

const API_URL = 'http://localhost:8081/api';

const mesaService = {
  // Obtener todas las mesas
  getMesas: async () => {
    try {
      const response = await axios.get(`${API_URL}/mesas`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mesas:', error);
      // Para pruebas, devolver datos de ejemplo
      return [
        { id: 1, numero: 'M1', capacidad: 4, ubicacion: 'Terraza', estado: 'DISPONIBLE' },
        { id: 2, numero: 'M2', capacidad: 2, ubicacion: 'Interior', estado: 'OCUPADA' },
        { id: 3, numero: 'M3', capacidad: 6, ubicacion: 'Sala Principal', estado: 'DISPONIBLE' }
      ];
    }
  },

  // Crear nueva mesa
  createMesa: async (mesaData) => {
    try {
      const response = await axios.post(`${API_URL}/mesas`, mesaData);
      return response.data;
    } catch (error) {
      console.error('Error creating mesa:', error);
      // Simular éxito para pruebas
      return { ...mesaData, id: Date.now() };
    }
  },

  // Actualizar mesa
  updateMesa: async (id, mesaData) => {
    try {
      const response = await axios.put(`${API_URL}/mesas/${id}`, mesaData);
      return response.data;
    } catch (error) {
      console.error('Error updating mesa:', error);
      // Simular éxito para pruebas
      return { ...mesaData, id };
    }
  },

  // Eliminar mesa
  deleteMesa: async (id) => {
    try {
      await axios.delete(`${API_URL}/mesas/${id}`);
    } catch (error) {
      console.error('Error deleting mesa:', error);
      // Simular éxito para pruebas
      console.log(`Mesa ${id} eliminada (simulado)`);
    }
  }
};

export default mesaService;
