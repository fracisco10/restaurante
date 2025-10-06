package com.donfranccesco.restaurant.controller;

import com.donfranccesco.restaurant.model.Usuario;
import com.donfranccesco.restaurant.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")

public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Crear usuario
    @PostMapping
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioService.guardar(usuario);
    }

    // Listar todos
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarTodos();
    }

    // Buscar por id
    @GetMapping("/{id}")
    public Optional<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }
    // Actualizar usuario
    @PutMapping("/{id}")
    public Usuario actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id); // Asegurar que el ID coincida
        return usuarioService.guardar(usuario);
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminar(id);
    }

    // Buscar por email (si tu Service tiene este método)
    @GetMapping("/email/{email}")
    public Optional<Usuario> buscarPorEmail(@PathVariable String email) {
        return usuarioService.buscarPorEmail(email);
    }
}
