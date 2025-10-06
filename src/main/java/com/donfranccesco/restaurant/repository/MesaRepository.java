package com.donfranccesco.restaurant.repository;

import com.donfranccesco.restaurant.model.Mesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface MesaRepository extends JpaRepository<Mesa, Long> {

}
