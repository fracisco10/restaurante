package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Plato;
import com.donfranccesco.restaurant.repository.PlatoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlatoService {
    private final PlatoRepository platoRepository;

    public PlatoService(PlatoRepository platoRepository) {
        this.platoRepository = platoRepository;
    }

    public Plato guardar(Plato plato) {
        return platoRepository.save(plato);
    }

    public List<Plato> listarTodos() {
        return platoRepository.findAll();
    }

    public Optional<Plato> buscarPorId(Long id) {
        return platoRepository.findById(id);
    }

    public void eliminar(Long id) {
        platoRepository.deleteById(id);
    }

    // Métodos personalizados
    public List<Plato> buscarPorCategoria(String categoria) {
        return platoRepository.findByCategoria(categoria);
    }

    public List<Plato> buscarPlatosDisponibles() {
        return platoRepository.findByDisponibleTrue();
    }

    public List<Plato> buscarPorNombre(String nombre) {
        return platoRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
