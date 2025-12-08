import React, { useState } from 'react';
import './Pagos.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        id: Date.now(),
        mesaId: mesa.id,
        amount: formData.amount,
        status: 'approved',
        transactionId: 'TXN_' + Date.now()
      });
    }, 2000);
  };

  return (
    <div className="checkout-overlay">
      <div className="checkout-form">
        <div className="checkout-header">
          <h2>Procesar Pago - Mesa {mesa.numero}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Número de Tarjeta</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
          </div>

          <div className="form-group">
            <label>Nombre en la Tarjeta</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="JUAN PEREZ"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha Expiración</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/AA"
                maxLength="5"
                required
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Monto a Pagar ($)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00"
              min="1"
              step="0.01"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-pay"
              disabled={isProcessing}
            >
              {isProcessing ? 'Procesando...' : `Pagar $${formData.amount || '0'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;

