// Detectar si estamos en desarrollo o producción
const isDevelopment = process.env.NODE_ENV === 'development';

// URL base para API - En desarrollo usa proxy, en producción usa ruta relativa
const API_BASE = isDevelopment ? '' : '';

console.log(`🚀 API Service - Modo: ${isDevelopment ? 'Desarrollo' : 'Producción'}`);

export const apiService = {
  async checkConnection() {
    try {
      const response = await fetch('/api/test');
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Backend conectado:', data);
        return { connected: true, data };
      }
      return { connected: false };
    } catch (error) {
      console.log('❌ Backend no disponible:', error.message);
      return { connected: false, error: error.message };
    }
  },

  async getMenu() {
    try {
      console.log('📋 Obteniendo menú...');
      const response = await fetch('/api/menu');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('✅ Menú obtenido:', data.platillos?.length || 0, 'platillos');
      return data;
    } catch (error) {
      console.log('⚠️ Error obteniendo menú:', error.message);
      throw error;
    }
  },

  async getMesas() {
    try {
      console.log('🪑 Obteniendo mesas...');
      const response = await fetch('/api/mesas');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('✅ Mesas obtenidas:', data.length || 0, 'mesas');
      return data;
    } catch (error) {
      console.log('⚠️ Error obteniendo mesas:', error.message);
      throw error;
    }
  },

  // Para desarrollo: health check directo
  async healthCheck() {
    if (isDevelopment) {
      try {
        const response = await fetch('http://localhost:8080/actuator/health');
        return await response.json();
      } catch (error) {
        return { status: 'DOWN', error: error.message };
      }
    }
    return { status: 'UNKNOWN', mode: 'production' };
  }
};

export default apiService;
