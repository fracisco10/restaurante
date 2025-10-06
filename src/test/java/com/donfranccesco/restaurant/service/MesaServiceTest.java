package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Mesa;
import com.donfranccesco.restaurant.repository.MesaRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)

public class MesaServiceTest {
    @Mock
    private MesaRepository mesaRepository;

    @InjectMocks
    private MesaService mesaService;

    @Test
    public void testGuardarMesa() {
        Mesa mesa = new Mesa();
        mesa.setNumero(1);
        mesa.setCapacidad(4);
        mesa.setDisponible(true);

        when(mesaRepository.save(any(Mesa.class))).thenReturn(mesa);

        Mesa resultado = mesaService.guardar(mesa);

        assertNotNull(resultado);
        assertEquals(1, resultado.getNumero());
        assertEquals(4, resultado.getCapacidad());
        verify(mesaRepository, times(1)).save(mesa);
    }
}
