package com.donfranccesco.restaurant.controller;

import com.donfranccesco.restaurant.model.Plato;
import com.donfranccesco.restaurant.service.PlatoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/platos")

public class PlatoController {
    private final PlatoService platoService;

    public PlatoController(PlatoService platoService) {
        this.platoService = platoService;
    }

    // Crear plato
    @PostMapping
    public Plato crearPlato(@RequestBody Plato plato) {
        return platoService.guardar(plato);
    }

    // Listar todos los platos
    @GetMapping
    public List<Plato> listarPlatos() {
        return platoService.listarTodos();
    }

    // Buscar plato por ID
    @GetMapping("/{id}")
    public Optional<Plato> buscarPorId(@PathVariable Long id) {
        return platoService.buscarPorId(id);
    }

    // Actualizar plato
    @PutMapping("/{id}")
    public Plato actualizarPlato(@PathVariable Long id, @RequestBody Plato plato) {
        plato.setId(id);
        return platoService.guardar(plato);
    }

    // Eliminar plato
    @DeleteMapping("/{id}")
    public void eliminarPlato(@PathVariable Long id) {
        platoService.eliminar(id);
    }
}
