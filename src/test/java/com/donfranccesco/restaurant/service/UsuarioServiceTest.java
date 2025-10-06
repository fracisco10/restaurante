package com.donfranccesco.restaurant.service;

import com.donfranccesco.restaurant.model.Usuario;
import com.donfranccesco.restaurant.repository.UsuarioRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)

public class UsuarioServiceTest {
    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    @Test
    public void testGuardarUsuario() {
        // Preparar
        Usuario usuario = new Usuario();
        usuario.setNombre("Ana García");
        usuario.setEmail("ana@test.com");

        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuario);

        // Ejecutar
        Usuario resultado = usuarioService.guardar(usuario);

        // Verificar
        assertNotNull(resultado);
        assertEquals("ana@test.com", resultado.getEmail());
        verify(usuarioRepository, times(1)).save(usuario);
    }


}
