package com.donfranccesco.restaurant.model;

import jakarta.persistence.*;

@Entity
@Table(name = "clientes")

public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String correo;
    private String telefono;
    private String email;

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    // SETTER para email
    public void setEmail(String email) {
        this.email = email;
    }

    // GETTER para email
    public String getEmail() {
        return this.email;
    }

}
