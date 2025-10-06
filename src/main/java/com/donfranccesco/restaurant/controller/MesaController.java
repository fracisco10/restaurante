package com.donfranccesco.restaurant.controller;

import com.donfranccesco.restaurant.model.Mesa;
import com.donfranccesco.restaurant.service.MesaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mesas")

public class MesaController {
    private final MesaService mesaService;

    public MesaController(MesaService mesaService) {
        this.mesaService = mesaService;
    }

    @PostMapping
    public Mesa crearMesa(@RequestBody Mesa mesa) {
        return mesaService.guardar(mesa);
    }

    @GetMapping
    public List<Mesa> listarMesas() {
        return mesaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Mesa> buscarPorId(@PathVariable Long id) {
        return mesaService.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public Mesa actualizarMesa(@PathVariable Long id, @RequestBody Mesa mesa) {
        mesa.setId(id);
        return mesaService.guardar(mesa);
    }

    @DeleteMapping("/{id}")
    public void eliminarMesa(@PathVariable Long id) {
        mesaService.eliminar(id);
    }
}
