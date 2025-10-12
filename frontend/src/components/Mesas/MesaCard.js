import React, { useState } from 'react';

// Componente CheckoutForm TEMPORAL dentro del mismo archivo
const CheckoutForm = ({ mesa, onClose, onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    amount: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      console.log('📦 Datos del pago a enviar:', {
        mesaId: mesa.id,
        monto: parseFloat(formData.amount),
        numeroTarjeta: formData.cardNumber,
        nombreTarjeta: formData.cardName,
        fechaExpiracion: formData.expiryDate,
        cvv: formData.cvv
      });

      // 🔧 SIMULACIÓN TEMPORAL - Comenta esto cuando quieras conectar con el backend real
      console.log('🔧 Simulando pago...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      const pagoSimulado = {
        transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        success: true,
        amount: parseFloat(formData.amount),
        message: 'Pago procesado exitosamente',
        timestamp: new Date().toISOString()
      };

      console.log('✅ Pago simulado exitoso:', pagoSimulado);
      setIsProcessing(false);
      onPaymentSuccess(pagoSimulado);

      // ⚠️ COMENTA las líneas anteriores y DESCOMENTA esto para conectar con backend real:
      /*
      const pagoData = {
        mesaId: mesa.id,
        monto: parseFloat(formData.amount),
        numeroTarjeta: formData.cardNumber,
        nombreTarjeta: formData.cardName,
        fechaExpiracion: formData.expiryDate,
        cvv: formData.cvv
      };

      const pagoProcesado = await pagoService.procesarPago(pagoData);
      setIsProcessing(false);
      onPaymentSuccess(pagoProcesado);
      */

    } catch (error) {
      console.error('❌ Error en pago:', error);
      setIsProcessing(false);
      alert('Error al procesar el pago: ' + error.message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1002
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '450px',
        padding: '0'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>Procesar Pago - Mesa {mesa.numero}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              width: '30px',
              height: '30px',
              borderRadius: '50%'
            }}
          >×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '25px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Número de Tarjeta</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="4242 4242 4242 4242"
              maxLength="19"
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Nombre en la Tarjeta</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="JUAN PEREZ"
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Fecha Expiración</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="12/25"
                maxLength="5"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="3"
                required
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '2px solid #e1e5e9',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Monto a Pagar ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="100.00"
              min="1"
              step="0.01"
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '25px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                background: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                flex: 2,
                background: isProcessing ? '#ccc' : 'linear-gradient(135deg, #28a745, #20c997)',
                color: 'white',
                border: 'none',
                padding: '14px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? 'Procesando...' : `Pagar $${formData.amount || '0'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente MesaCard principal
const MesaCard = ({ mesa, onEdit, onDelete, onToggleStatus }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { id, numero, capacidad, estado, ubicacion } = mesa;

  const handlePaymentSuccess = (paymentData) => {
    console.log('Pago exitoso:', paymentData);
    setShowCheckout(false);
    alert(`¡Pago procesado exitosamente! 🎉\n\nTransacción: ${paymentData.transactionId}\nMonto: $${paymentData.amount}\nMesa: ${numero}`);

    // Opcional: Liberar la mesa automáticamente después del pago
    if (onToggleStatus) {
      onToggleStatus(id);
    }
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <div className={`mesa-card ${estado?.toLowerCase()}`}>
      <div className="mesa-header">
        <h3>Mesa {numero}</h3>
        <span className={`estado-badge ${estado?.toLowerCase()}`}>
          {estado}
        </span>
      </div>

      <div className="mesa-info">
        <p><strong>Capacidad:</strong> {capacidad} personas</p>
        <p><strong>Ubicación:</strong> {ubicacion || 'Sin ubicación'}</p>
      </div>

      <div className="mesa-actions">
        <button
          onClick={() => onToggleStatus(id)}
          className={`btn-status ${estado === 'DISPONIBLE' ? 'ocupar' : 'liberar'}`}
        >
          {estado === 'DISPONIBLE' ? 'Ocupar' : 'Liberar'}
        </button>

        {estado === 'OCUPADA' && (
          <button
            onClick={() => setShowCheckout(true)}
            className="btn-pay"
          >
            Pagar
          </button>
        )}

        <button onClick={() => onEdit(mesa)} className="btn-edit">
          Editar
        </button>

        <button onClick={() => onDelete(id)} className="btn-delete">
          Eliminar
        </button>
      </div>

      {showCheckout && (
        <CheckoutForm
          mesa={mesa}
          onClose={handleCloseCheckout}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default MesaCard;

