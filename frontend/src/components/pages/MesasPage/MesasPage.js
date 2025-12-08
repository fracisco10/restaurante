import React from 'react';
// Importar DESDE LA UBICACIÓN ORIGINAL, no de features/
import MesaList from '../../Mesas/MesaList'; // <- Esto apunta a src/components/Mesas/
import './MesasPage.css';

function MesasPage() {
  return (
    <div className="mesas-page">
      <div className="page-header">
        <h1>🪑 Gestión de Mesas</h1>
        <p>Administra el estado, disponibilidad y configuración de todas las mesas del restaurante</p>
      </div>

      <div className="mesas-container">
        <MesaList />
      </div>
    </div>
  );
}

export default MesasPage;

