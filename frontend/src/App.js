import React from 'react';
import MesaList from './components/Mesas/MesaList';
import Chatbot from './components/Chatbot/Chatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <MesaList />
      <Chatbot />  {/* ← ¡AGREGAR ESTA LÍNEA! */}
    </div>
  );
}

export default App;

