package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Pedido;
import com.donfranccesco.restaurant.repository.PedidoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PedidoServiceTest {
    @Mock
    private PedidoRepository pedidoRepository;

    @InjectMocks
    private PedidoService pedidoService;

    private Pedido pedido;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        pedido = new Pedido();
        pedido.setId(1L);
        pedido.setFecha(LocalDateTime.now());
    }

    @Test
    void testGuardar() {
        when(pedidoRepository.save(pedido)).thenReturn(pedido);

        Pedido result = pedidoService.guardar(pedido);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(pedidoRepository, times(1)).save(pedido);
    }

    @Test
    void testListarTodos() {
        when(pedidoRepository.findAll()).thenReturn(Arrays.asList(pedido));

        List<Pedido> result = pedidoService.listarTodos();

        assertEquals(1, result.size());
        verify(pedidoRepository, times(1)).findAll();
    }

    @Test
    void testBuscarPorId() {
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        Optional<Pedido> result = pedidoService.buscarPorId(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
        verify(pedidoRepository, times(1)).findById(1L);
    }

    @Test
    void testEliminar() {
        doNothing().when(pedidoRepository).deleteById(1L);

        pedidoService.eliminar(1L);

        verify(pedidoRepository, times(1)).deleteById(1L);
    }

}
