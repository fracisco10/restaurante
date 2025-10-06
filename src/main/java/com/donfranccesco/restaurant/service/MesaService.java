package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Mesa;
import com.donfranccesco.restaurant.repository.MesaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class MesaService {
    private final MesaRepository mesaRepository;

    public MesaService(MesaRepository mesaRepository) {
        this.mesaRepository = mesaRepository;
    }

    public Mesa guardar(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    public List<Mesa> listarTodos() {
        return mesaRepository.findAll();
    }

    public Optional<Mesa> buscarPorId(Long id) {
        return mesaRepository.findById(id);
    }

    public void eliminar(Long id) {
        mesaRepository.deleteById(id);
    }
}
