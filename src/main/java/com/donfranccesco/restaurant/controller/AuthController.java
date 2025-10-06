package com.donfranccesco.restaurant.controller;

import com.donfranccesco.restaurant.config.JwtService;
import com.donfranccesco.restaurant.model.Usuario;
import com.donfranccesco.restaurant.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")

public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsuarioService usuarioService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UsuarioService usuarioService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // Autenticar al usuario
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // Cargar usuario y generar token
        UserDetails user = usuarioService.loadUserByUsername(request.getUsername());
        String jwt = jwtService.generateToken(user);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody Usuario usuario) {
        // Crear nuevo usuario
        Usuario nuevoUsuario = usuarioService.crearUsuario(usuario);

        // Generar token automáticamente
        UserDetails user = usuarioService.loadUserByUsername(nuevoUsuario.getUsername());
        String jwt = jwtService.generateToken(user);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    // Clases internas para las requests/responses
    public static class LoginRequest {
        private String username;
        private String password;

        // Getters y setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String token;

        public AuthResponse(String token) {
            this.token = token;
        }

        // Getter y setter
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
    }
}
