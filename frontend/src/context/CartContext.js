import React, { createContext, useState, useContext } from 'react';
import { carritoInicial } from '../data/menuData';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(carritoInicial);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (platillo) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.platilloId === platillo.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.platilloId === platillo.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        const newItem = {
          id: Date.now(),
          platilloId: platillo.id,
          nombre: platillo.nombre,
          precio: platillo.precio,
          cantidad: 1,
          notas: '',
          imagen: platillo.imagen
        };
        return [...prevCart, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, nuevaCantidad) => {
    if (nuevaCantidad < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const updateNotes = (itemId, notas) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, notas }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const value = {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateNotes,
    clearCart,
    getTotal,
    getTotalItems,
    toggleCart,
    setIsCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
