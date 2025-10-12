package com.donfranccesco.restaurant.service;


import com.donfranccesco.restaurant.model.Pago;
import com.donfranccesco.restaurant.repository.PagoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)

public class PagoServiceTest {
    @Mock
    private PagoRepository pagoRepository;

    @InjectMocks
    private PagoService pagoService;

    private Pago pago;
    private Pago pago2;

    @BeforeEach
    void setUp() {
        // Configurar datos de prueba
        pago = new Pago(1L, 50.0, "1234567890123456", "JUAN PEREZ", "12/25", "123");
        pago.setId(1L);

        pago2 = new Pago(2L, 75.0, "9876543210987654", "MARIA GARCIA", "06/24", "456");
        pago2.setId(2L);
    }

    @Test
    void guardarPago_DebeRetornarPagoGuardado() {
        // Arrange
        when(pagoRepository.save(any(Pago.class))).thenReturn(pago);

        // Act
        Pago resultado = pagoService.guardarPago(pago);

        // Assert
        assertNotNull(resultado);
        assertEquals("APROBADO", resultado.getEstado());
        assertTrue(resultado.getIdTransaccion().contains("TXN_"));
        verify(pagoRepository, times(1)).save(pago);
    }

    @Test
    void obtenerTodosLosPagos_DebeRetornarListaDePagos() {
        // Arrange
        List<Pago> pagosEsperados = Arrays.asList(pago, pago2);
        when(pagoRepository.findAll()).thenReturn(pagosEsperados);

        // Act
        List<Pago> resultado = pagoService.obtenerTodosLosPagos();

        // Assert
        assertNotNull(resultado);
        assertEquals(2, resultado.size());
        verify(pagoRepository, times(1)).findAll();
    }

    @Test
    void obtenerPagoPorId_PagoExiste_DebeRetornarPago() {
        // Arrange
        when(pagoRepository.findById(1L)).thenReturn(Optional.of(pago));

        // Act
        Optional<Pago> resultado = pagoService.obtenerPagoPorId(1L);

        // Assert
        assertTrue(resultado.isPresent());
        assertEquals(1L, resultado.get().getId());
        verify(pagoRepository, times(1)).findById(1L);
    }

    @Test
    void obtenerPagoPorId_PagoNoExiste_DebeRetornarEmpty() {
        // Arrange
        when(pagoRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Optional<Pago> resultado = pagoService.obtenerPagoPorId(99L);

        // Assert
        assertFalse(resultado.isPresent());
        verify(pagoRepository, times(1)).findById(99L);
    }

    @Test
    void obtenerPagosPorMesa_DebeRetornarPagosDeMesaEspecifica() {
        // Arrange
        List<Pago> pagosMesa1 = Arrays.asList(pago);
        when(pagoRepository.findByMesaId(1L)).thenReturn(pagosMesa1);

        // Act
        List<Pago> resultado = pagoService.obtenerPagosPorMesa(1L);

        // Assert
        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals(1L, resultado.get(0).getMesaId());
        verify(pagoRepository, times(1)).findByMesaId(1L);
    }

    @Test
    void eliminarPago_DebeLlamarMetodoDelete() {
        // Arrange - no necesita when() para delete

        // Act
        pagoService.eliminarPago(1L);

        // Assert
        verify(pagoRepository, times(1)).deleteById(1L);
    }
}
