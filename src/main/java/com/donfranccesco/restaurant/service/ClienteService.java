package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Cliente;
import com.donfranccesco.restaurant.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ClienteService {
    private final ClienteRepository clienteRepository;

    // Inyección por constructor
    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Guardar cliente
    public Cliente guardar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // Listar todos los clientes
    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    // Buscar cliente por ID
    public Optional<Cliente> buscarPorId(Long id) {
        return clienteRepository.findById(id);
    }

    // Eliminar cliente por ID
    public void eliminar(Long id) {
        clienteRepository.deleteById(id);
    }
}
