package com.donfranccesco.restaurant.controller;

import com.donfranccesco.restaurant.model.Pago;
import com.donfranccesco.restaurant.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pagos")

public class PagoController {
    @Autowired
    private PagoService pagoService;

    // Procesar un nuevo pago
    @PostMapping
    public ResponseEntity<?> procesarPago(@RequestBody Pago pago) {
        try {
            Pago pagoGuardado = pagoService.guardarPago(pago);
            return ResponseEntity.ok(pagoGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Error al procesar el pago: " + e.getMessage())
            );
        }
    }

    // Obtener todos los pagos
    @GetMapping
    public List<Pago> obtenerTodosLosPagos() {
        return pagoService.obtenerTodosLosPagos();
    }

    // Obtener pago por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPagoPorId(@PathVariable Long id) {
        return pagoService.obtenerPagoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Obtener pagos por mesa
    @GetMapping("/mesa/{mesaId}")
    public List<Pago> obtenerPagosPorMesa(@PathVariable Long mesaId) {
        return pagoService.obtenerPagosPorMesa(mesaId);
    }

    // Eliminar pago
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPago(@PathVariable Long id) {
        try {
            pagoService.eliminarPago(id);
            return ResponseEntity.ok().body(Map.of("message", "Pago eliminado correctamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Error al eliminar el pago: " + e.getMessage())
            );
        }
    }
}
