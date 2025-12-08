import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Datos de usuario de prueba
  const mockUsers = [
    { id: 1, nombre: 'Don Franccesco', email: 'admin@donfranccesco.com', rol: 'admin' },
    { id: 2, nombre: 'Cliente Ejemplo', email: 'cliente@ejemplo.com', rol: 'cliente' },
  ];

  // Simular login
  const login = async (email, password) => {
    setLoading(true);

    // Simular llamada API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Buscar usuario (en producción sería llamada real a API)
    const foundUser = mockUsers.find(u => u.email === email);

    if (foundUser && password === 'password123') { // Contraseña simple para demo
      const userData = { ...foundUser, token: 'mock-jwt-token' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, user: userData };
    } else {
      return { success: false, error: 'Credenciales incorrectas' };
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Registrar nuevo usuario
  const register = async (userData) => {
    setLoading(true);

    // Simular llamada API
    await new Promise(resolve => setTimeout(resolve, 500));

    const newUser = {
      id: Date.now(),
      nombre: userData.nombre,
      email: userData.email,
      rol: 'cliente',
      token: 'mock-jwt-token'
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));

    return { success: true, user: newUser };
  };

  // Verificar si hay usuario en localStorage al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Verificar si es admin
  const isAdmin = user?.rol === 'admin';

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
