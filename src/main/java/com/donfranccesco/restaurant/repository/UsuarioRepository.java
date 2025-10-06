package com.donfranccesco.restaurant.repository;

import com.donfranccesco.restaurant.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username); // Si usas username
    Optional<Usuario> findByEmail(String email);       // Si usas email
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
