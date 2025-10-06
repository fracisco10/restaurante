package com.donfranccesco.restaurant.controller;

import com.donfranccesco.restaurant.model.Cliente;
import com.donfranccesco.restaurant.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/clientes")

public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // Crear cliente
    @PostMapping
    public Cliente crearCliente(@RequestBody Cliente cliente) {
        return clienteService.guardar(cliente);
    }

    // Listar todos los clientes
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteService.listarTodos();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    public Optional<Cliente> buscarPorId(@PathVariable Long id) {
        return clienteService.buscarPorId(id);
    }

    // Actualizar cliente
    @PutMapping("/{id}")
    public Cliente actualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        cliente.setId(id);
        return clienteService.guardar(cliente);
    }

    // Eliminar cliente
    @DeleteMapping("/{id}")
    public void eliminarCliente(@PathVariable Long id) {
        clienteService.eliminar(id);
    }

}
