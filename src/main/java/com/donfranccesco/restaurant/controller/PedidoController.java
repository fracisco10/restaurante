package com.donfranccesco.restaurant.controller;

import com.donfranccesco.restaurant.model.Pedido;
import com.donfranccesco.restaurant.service.PedidoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pedidos")

public class PedidoController {
    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public Pedido crearPedido(@RequestBody Pedido pedido) {
        return pedidoService.guardar(pedido);
    }

    @GetMapping
    public List<Pedido> listarPedidos() {
        return pedidoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Pedido> buscarPorId(@PathVariable Long id) {
        return pedidoService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Pedido actualizarPedido(@PathVariable Long id, @RequestBody Pedido pedido) {
        pedido.setId(id);
        return pedidoService.guardar(pedido);
    }

    @DeleteMapping("/{id}")
    public void eliminarPedido(@PathVariable Long id) {
        pedidoService.eliminar(id);
    }
}
