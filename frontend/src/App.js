import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';

// Context Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Pages
import Home from './components/pages/Home/Home';
import MenuPage from './components/pages/MenuPage/MenuPage';
import AdminPage from './components/pages/AdminPage/AdminPage';
import MesasPage from './components/pages/MesasPage/MesasPage';
import PagosPage from './components/pages/PagosPage/PagosPage';
import ChatbotPage from './components/pages/ChatbotPage/ChatbotPage';
import ReservasPage from './components/pages/ReservasPage/ReservasPage';

// Chatbot flotante
import Chatbot from './components/Chatbot/Chatbot';

// Estilos
import './App.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <AuthProvider>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mesas" element={<MesasPage />} />
                <Route path="/pagos" element={<PagosPage />} />
                <Route path="/chatbot" element={<ChatbotPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/reservas" element={<ReservasPage />} />
                <Route path="*" element={<Home />} />
              </Routes>

              <div className="floating-chatbot">
                <Chatbot />
              </div>
            </Layout>
          </CartProvider>
        </AuthProvider>
      </AppProvider>
    </Router>
  );
}

export default App;




