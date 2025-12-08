// Configuración de rutas para imports
export const PATHS = {
  components: {
    // Componentes originales
    MesaList: '../components/Mesas/MesaList',
    Chatbot: '../components/Chatbot/Chatbot',
    CheckoutForm: '../components/Pagos/ChekoutForm',

    // Nuevos componentes comunes
    Header: './common/Header/Header',
    Footer: './common/Footer/Footer',
    Layout: './common/Layout/Layout',
  },

  services: {
    mesaService: '../services/mesaService',
  },

  pages: {
    Home: './pages/Home/Home',
    MenuPage: './pages/MenuPage/MenuPage',
    AdminPage: './pages/AdminPage/AdminPage',
    MesasPage: './pages/MesasPage/MesasPage',
    PagosPage: './pages/PagosPage/PagosPage',
    ChatbotPage: './pages/ChatbotPage/ChatbotPage',
  }
};

