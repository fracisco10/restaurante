package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Plato;
import com.donfranccesco.restaurant.repository.PlatoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;

@ExtendWith(MockitoExtension.class)

public class PlatoServiceTest {
    @Mock
    private PlatoRepository platoRepository;

    @InjectMocks
    private PlatoService platoService;

    @Test
    public void testGuardarPlato() {
        // Preparar
        Plato plato = new Plato();
        plato.setNombre("Pizza Margherita");
        plato.setDescripcion("Pizza clásica italiana");
        plato.setPrecio(new BigDecimal("15.99"));
        plato.setCategoria("ITALIANA");
        plato.setDisponible(true);

        when(platoRepository.save(any(Plato.class))).thenReturn(plato);

        // Ejecutar
        Plato resultado = platoService.guardar(plato);

        // Verificar
        assertNotNull(resultado);
        assertEquals("Pizza Margherita", resultado.getNombre());
        assertEquals(0, new BigDecimal("15.99").compareTo(resultado.getPrecio()));

        verify(platoRepository, times(1)).save(plato);
    }

    @Test
    public void testBuscarPlatoPorIdExistente() {
        // Preparar
        Plato plato = new Plato();
        plato.setId(1L);
        plato.setNombre("Hamburguesa Clásica");
        plato.setPrecio(new BigDecimal("10.99"));

        when(platoRepository.findById(1L)).thenReturn(Optional.of(plato));

        // Ejecutar
        Optional<Plato> resultado = platoService.buscarPorId(1L);

        // Verificar
        assertTrue(resultado.isPresent());
        assertEquals("Hamburguesa Clásica", resultado.get().getNombre());
        verify(platoRepository, times(1)).findById(1L);
    }

    @Test
    public void testBuscarPlatoPorIdNoExistente() {
        // Preparar
        when(platoRepository.findById(999L)).thenReturn(Optional.empty());

        // Ejecutar
        Optional<Plato> resultado = platoService.buscarPorId(999L);

        // Verificar
        assertFalse(resultado.isPresent());
        verify(platoRepository, times(1)).findById(999L);
    }

    @Test
    public void testEliminarPlato() {
        // Ejecutar
        platoService.eliminar(1L);

        // Verificar
        verify(platoRepository, times(1)).deleteById(1L);
    }
}
