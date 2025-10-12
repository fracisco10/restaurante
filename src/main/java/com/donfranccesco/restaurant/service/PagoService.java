package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Pago;
import com.donfranccesco.restaurant.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    // Guardar un pago
    public Pago guardarPago(Pago pago) {
        // Generar ID de transacción
        String transactionId = "TXN_" + System.currentTimeMillis() + "_" + pago.getMesaId();
        pago.setIdTransaccion(transactionId);
        pago.setEstado("APROBADO"); // Simulamos que siempre se aprueba

        return pagoRepository.save(pago);
    }

    // Obtener todos los pagos
    public List<Pago> obtenerTodosLosPagos() {
        return pagoRepository.findAll();
    }

    // Obtener pago por ID
    public Optional<Pago> obtenerPagoPorId(Long id) {
        return pagoRepository.findById(id);
    }

    // Obtener pagos por mesa
    public List<Pago> obtenerPagosPorMesa(Long mesaId) {
        return pagoRepository.findByMesaId(mesaId);
    }

    // Eliminar pago
    public void eliminarPago(Long id) {
        pagoRepository.deleteById(id);
    }
}