import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { mesaService, pagoService } from '../../services/mesaService';

const MobileMesaCard = ({ mesa, onMesaUpdated }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleToggleStatus = async () => {
    try {
      setIsProcessing(true);
      const nuevoEstado = mesa.estado === 'DISPONIBLE' ? 'OCUPADA' : 'DISPONIBLE';
      await mesaService.updateMesa(mesa.id, { estado: nuevoEstado });
      onMesaUpdated();
      Alert.alert('✅ Éxito', `Mesa ${mesa.numero} ahora está ${nuevoEstado}`);
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudo cambiar el estado de la mesa');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePagarMesa = async () => {
    try {
      setIsProcessing(true);

      // Simulamos un pago por ahora
      const pagoData = {
        mesaId: mesa.id,
        monto: 100.00, // Podemos hacer este valor dinámico después
        numeroTarjeta: '4242424242424242',
        nombreTarjeta: 'CLIENTE MOVIL',
        fechaExpiracion: '12/25',
        cvv: '123'
      };

      const resultadoPago = await pagoService.procesarPago(pagoData);

      Alert.alert(
        '💳 Pago Exitoso',
        `Transacción: ${resultadoPago.transactionId || 'TXN_MOVIL_' + Date.now()}\nMonto: $${pagoData.monto}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Liberar la mesa después del pago exitoso
              handleToggleStatus();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('❌ Error en Pago', error.message || 'No se pudo procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  const getEstadoColor = () => {
    switch (mesa.estado) {
      case 'DISPONIBLE': return '#4CAF50'; // Verde
      case 'OCUPADA': return '#F44336';    // Rojo
      case 'RESERVADA': return '#FF9800';  // Naranja
      default: return '#9E9E9E';           // Gris
    }
  };

  const getEstadoEmoji = () => {
    switch (mesa.estado) {
      case 'DISPONIBLE': return '🟢';
      case 'OCUPADA': return '🔴';
      case 'RESERVADA': return '🟡';
      default: return '⚪';
    }
  };

  return (
    <View style={[styles.card, { borderLeftColor: getEstadoColor() }]}>

      {/* Header con número de mesa y estado */}
      <View style={styles.header}>
        <View style={styles.mesaInfo}>
          <Text style={styles.mesaNumber}>Mesa {mesa.numero}</Text>
          <Text style={styles.capacidadText}>{mesa.capacidad} personas</Text>
        </View>
        <View style={[styles.estadoBadge, { backgroundColor: getEstadoColor() }]}>
          <Text style={styles.estadoText}>
            {getEstadoEmoji()} {mesa.estado}
          </Text>
        </View>
      </View>

      {/* Información adicional */}
      <View style={styles.info}>
        <Text style={styles.ubicacionText}>📍 {mesa.ubicacion || 'Ubicación no especificada'}</Text>
        {mesa.estado === 'OCUPADA' && (
          <Text style={styles.ocupadaText}>💵 Lista para cobrar</Text>
        )}
      </View>

      {/* Botones de acción */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.statusButton,
            mesa.estado === 'DISPONIBLE' ? styles.ocuparButton : styles.liberarButton,
            isProcessing && styles.disabledButton
          ]}
          onPress={handleToggleStatus}
          disabled={isProcessing}
        >
          <Text style={styles.buttonText}>
            {isProcessing ? '⏳' : mesa.estado === 'DISPONIBLE' ? '🪑 Ocupar' : '🔄 Liberar'}
          </Text>
        </TouchableOpacity>

        {mesa.estado === 'OCUPADA' && (
          <TouchableOpacity
            style={[
              styles.button,
              styles.payButton,
              isProcessing && styles.disabledButton
            ]}
            onPress={handlePagarMesa}
            disabled={isProcessing}
          >
            <Text style={styles.buttonText}>
              {isProcessing ? '⏳' : '💳 Pagar $100'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  mesaInfo: {
    flex: 1,
  },
  mesaNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  capacidadText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  estadoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  estadoText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
  info: {
    marginBottom: 16,
  },
  ubicacionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ocupadaText: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusButton: {
    // Estilos base para botón de estado
  },
  ocuparButton: {
    backgroundColor: '#4CAF50', // Verde
  },
  liberarButton: {
    backgroundColor: '#FF3B30', // Rojo
  },
  payButton: {
    backgroundColor: '#34C759', // Verde más vibrante para pagos
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default MobileMesaCard;
