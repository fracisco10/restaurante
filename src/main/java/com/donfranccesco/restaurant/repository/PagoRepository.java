package com.donfranccesco.restaurant.repository;
import com.donfranccesco.restaurant.model.Pago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    // Encontrar pagos por mesaId
    List<Pago> findByMesaId(Long mesaId);

    // Encontrar pagos por estado
    List<Pago> findByEstado(String estado);
}


