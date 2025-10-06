package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Usuario;
import com.donfranccesco.restaurant.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
public class UsuarioService implements UserDetailsService{

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    // Constructor para inyección por constructor (recomendado)
    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder; // ✅ Inicializar passwordEncoder
    }

    // Lecturas: no modifican la BD
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    // Escritura: envolvemos en transacción
    @Transactional
    public Usuario guardar(Usuario usuario) {
        // Aquí podrías añadir validaciones (p.ej. email único)
        return usuarioRepository.save(usuario);
    }


    public Usuario crearUsuario(Usuario usuario) {
        if (usuario.getPassword() == null) {
            throw new IllegalArgumentException("Password es requerido");
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword())); // ✅ Ahora passwordEncoder está inicializado
        return usuarioRepository.save(usuario);
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        return User.builder()
                .username(usuario.getUsername())  // ✅ Debe coincidir con el campo
                .password(usuario.getPassword())   // ✅ Debe coincidir con el campo
                .roles(usuario.getRolString())
                .build();
    }


    // ✅ Método adicional útil
    public Optional<Usuario> findByUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }

    @Transactional
    public void eliminar(Long id) {
        usuarioRepository.deleteById(id);
    }

}
