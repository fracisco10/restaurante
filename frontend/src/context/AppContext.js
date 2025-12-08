import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Agregar notificación
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    const notification = { id, message, type, timestamp: new Date() };
    
    setNotifications(prev => [notification, ...prev]);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Remover notificación
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Limpiar todas las notificaciones
  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    appLoading,
    setAppLoading,
    notifications,
    addNotification,
    removeNotification,
    clearNotifications
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
