package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Cliente;
import com.donfranccesco.restaurant.repository.ClienteRepository;
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

public class ClienteServiceTest {
    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    @Test
    public void testGuardarCliente() {
        // Preparar
        Cliente cliente = new Cliente();
        cliente.setNombre("Carlos Mendoza");
        cliente.setEmail("carlos@cliente.com");
        cliente.setTelefono("+573001234567");

        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente);

        // Ejecutar
        Cliente resultado = clienteService.guardar(cliente);

        // Verificar
        assertNotNull(resultado);
        assertEquals("carlos@cliente.com", resultado.getEmail());
        verify(clienteRepository, times(1)).save(cliente);
    }

    @Test
    public void testBuscarClientePorIdExistente() {
        // Preparar
        Cliente cliente = new Cliente();
        cliente.setId(1L);
        cliente.setNombre("Carlos Mendoza");
        cliente.setEmail("carlos@cliente.com");

        when(clienteRepository.findById(1L)).thenReturn(Optional.of(cliente));

        // Ejecutar
        Optional<Cliente> resultado = clienteService.buscarPorId(1L);

        // Verificar
        assertTrue(resultado.isPresent());
        assertEquals("Carlos Mendoza", resultado.get().getNombre());
        verify(clienteRepository, times(1)).findById(1L);
    }

    @Test
    public void testBuscarClientePorIdNoExistente() {
        // Preparar
        when(clienteRepository.findById(999L)).thenReturn(Optional.empty());

        // Ejecutar
        Optional<Cliente> resultado = clienteService.buscarPorId(999L);

        // Verificar
        assertFalse(resultado.isPresent());
        verify(clienteRepository, times(1)).findById(999L);
    }

    @Test
    public void testEliminarCliente() {
        // Ejecutar
        clienteService.eliminar(1L);

        // Verificar
        verify(clienteRepository, times(1)).deleteById(1L);
    }
}
