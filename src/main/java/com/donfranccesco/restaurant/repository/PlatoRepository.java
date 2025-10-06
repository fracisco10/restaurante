package com.donfranccesco.restaurant.repository;

import com.donfranccesco.restaurant.model.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatoRepository extends JpaRepository<Plato, Long>{
    // Método personalizado para buscar platos por categoría
    List<Plato> findByCategoria(String categoria);

    // Método personalizado para buscar platos disponibles
    List<Plato> findByDisponibleTrue();

    // Método personalizado para buscar por nombre (ejemplo)
    List<Plato> findByNombreContainingIgnoreCase(String nombre);
}
