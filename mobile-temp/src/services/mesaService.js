// services/mesaService.js

// Datos de ejemplo para simular la base de datos
const mesasEjemplo = [
  { id: 1, nombre: '1', estado: 'libre', capacidad: 4 },
  { id: 2, nombre: '2', estado: 'ocupada', capacidad: 2 },
  { id: 3, nombre: '3', estado: 'pagando', capacidad: 6 },
  { id: 4, nombre: '4', estado: 'libre', capacidad: 4 },
  { id: 5, nombre: '5', estado: 'ocupada', capacidad: 8 },
  { id: 6, nombre: '6', estado: 'libre', capacidad: 2 },
];

// Función para simular delays de API
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mesaService = {
  // Obtener todas las mesas
  getMesas: async () => {
    await simulateDelay(800);

    // Simular error aleatorio (10% de probabilidad)
    if (Math.random() < 0.1) {
      throw new Error('Error de conexión con el servidor');
    }

    return [...mesasEjemplo];
  },

  // Actualizar estado de una mesa
  updateMesaEstado: async (id, estado) => {
    await simulateDelay(300);

    // Simular error aleatorio (5% de probabilidad)
    if (Math.random() < 0.05) {
      throw new Error('No se pudo actualizar la mesa');
    }

    // En una implementación real, aquí iría la llamada a la API:
    // const response = await fetch(`http://tu-api.com/mesas/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ estado })
    // });
    // return await response.json();

    console.log(`Mesa ${id} actualizada a estado: ${estado}`);
    return { success: true, id, estado };
  },

  // Obtener una mesa por su ID
  getMesaById: async (id) => {
    await simulateDelay(200);
    const mesa = mesasEjemplo.find(m => m.id === id);
    if (!mesa) throw new Error('Mesa no encontrada');
    return mesa;
  },

  // Crear una nueva mesa (función adicional)
  createMesa: async (mesaData) => {
    await simulateDelay(400);

    const nuevaMesa = {
      id: Math.max(...mesasEjemplo.map(m => m.id)) + 1,
      ...mesaData
    };

    console.log('Nueva mesa creada:', nuevaMesa);
    return { success: true, mesa: nuevaMesa };
  },

  // Eliminar una mesa (función adicional)
  deleteMesa: async (id) => {
    await simulateDelay(300);

    const mesaIndex = mesasEjemplo.findIndex(m => m.id === id);
    if (mesaIndex === -1) throw new Error('Mesa no encontrada');

    console.log(`Mesa ${id} eliminada`);
    return { success: true, id };
  }
};
