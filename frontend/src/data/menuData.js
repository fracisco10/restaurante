// Datos de prueba para el menú italiano de Don Franccesco
export const categorias = [
  { id: 1, nombre: "Antipasti", descripcion: "Entradas italianas", icono: "🍅" },
  { id: 2, nombre: "Primi", descripcion: "Pastas y risottos", icono: "🍝" },
  { id: 3, nombre: "Secondi", descripcion: "Carnes y pescados", icono: "🍖" },
  { id: 4, nombre: "Pizza", descripcion: "Pizzas artesanales", icono: "🍕" },
  { id: 5, nombre: "Dolci", descripcion: "Postres italianos", icono: "🍰" },
  { id: 6, nombre: "Vini", descripcion: "Carta de vinos", icono: "🍷" },
  { id: 7, nombre: "Bevande", descripcion: "Bebidas y café", icono: "☕" },
];

export const platillos = [
  {
    id: 1,
    nombre: "Bruschetta al Pomodoro",
    descripcion: "Pan toscano con tomate fresco, albahaca y aceite de oliva",
    precio: 8.99,
    categoriaId: 1,
    imagen: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    destacado: true,
    ingredientes: ["Pan toscano", "Tomate fresco", "Albahaca", "Aceite de oliva", "Ajo"],
    tiempoPreparacion: 10
  },
  {
    id: 2,
    nombre: "Carpaccio di Manzo",
    descripcion: "Láminas finas de res con rúcula, parmesano y aceite de trufa",
    precio: 14.50,
    categoriaId: 1,
    imagen: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    destacado: true,
    ingredientes: ["Res premium", "Rúcula", "Queso parmesano", "Aceite de trufa", "Limón"],
    tiempoPreparacion: 15
  },
  {
    id: 3,
    nombre: "Spaghetti Carbonara",
    descripcion: "Spaghetti con huevo, pancetta, pecorino romano y pimienta negra",
    precio: 16.99,
    categoriaId: 2,
    imagen: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    destacado: true,
    ingredientes: ["Spaghetti", "Huevo", "Pancetta", "Pecorino romano", "Pimienta negra"],
    tiempoPreparacion: 20
  },
  {
    id: 4,
    nombre: "Lasagna della Nonna",
    descripcion: "Receta secreta de la abuela Franccesco con salsa boloñesa y bechamel",
    precio: 18.50,
    categoriaId: 2,
    imagen: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    destacado: true,
    ingredientes: ["Pasta para lasagna", "Carne molida", "Salsa tomate", "Bechamel", "Queso mozzarella"],
    tiempoPreparacion: 40
  },
  {
    id: 5,
    nombre: "Pizza Margherita",
    descripcion: "Clásica pizza napolitana con tomate, mozzarella y albahaca",
    precio: 12.99,
    categoriaId: 4,
    imagen: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    destacado: true,
    ingredientes: ["Masa napolitana", "Salsa de tomate", "Mozzarella di bufala", "Albahaca fresca", "Aceite de oliva"],
    tiempoPreparacion: 15
  },
  {
    id: 6,
    nombre: "Tiramisú Classico",
    descripcion: "Postre tradicional con café, mascarpone y cacao en polvo",
    precio: 7.99,
    categoriaId: 5,
    imagen: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    destacado: true,
    ingredientes: ["Queso mascarpone", "Café espresso", "Bizcochos ladyfingers", "Huevo", "Cacao en polvo"],
    tiempoPreparacion: 30
  },
  {
    id: 7,
    nombre: "Chianti Classico",
    descripcion: "Vino tinto DOCG de la Toscana, perfecto para carnes y pastas",
    precio: 9.50,
    categoriaId: 6,
    imagen: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    destacado: true,
    ingredientes: ["Uvas Sangiovese", "Barrica de roble"],
    tiempoPreparacion: 0
  }
];

export const carritoInicial = [
  {
    id: 1,
    platilloId: 3,
    nombre: "Spaghetti Carbonara",
    cantidad: 2,
    precio: 16.99,
    notas: "Sin mucho queso, por favor"
  },
  {
    id: 2,
    platilloId: 5,
    nombre: "Pizza Margherita",
    cantidad: 1,
    precio: 12.99,
    notas: ""
  }
];

export const usuarios = [
  {
    id: 1,
    nombre: "Don Franccesco",
    email: "admin@donfranccesco.com",
    rol: "admin",
    password: "password123"
  },
  {
    id: 2,
    nombre: "Maria Rossi",
    email: "cliente@ejemplo.com",
    rol: "cliente",
    password: "cliente123"
  }
];
