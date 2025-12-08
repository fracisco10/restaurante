package com.donfranccesco.restaurant.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/platos")
public class PlatoController {

    // Método GET para /api/platos - Devuelve lista de platos mock
    @GetMapping
    public Map<String, Object> listarPlatos() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Platos obtenidos correctamente");

        List<Map<String, Object>> platos = Arrays.asList(
                crearPlato(1, "Spaghetti Carbonara", 16.99, "Pastas", true),
                crearPlato(2, "Pizza Margherita", 12.99, "Pizzas", true),
                crearPlato(3, "Tiramisu Classico", 7.99, "Postres", false),
                crearPlato(4, "Lasagna della Nonna", 18.50, "Pastas", true),
                crearPlato(5, "Bruschetta al Pomodoro", 8.99, "Entradas", false),
                crearPlato(6, "Carpaccio di Manzo", 14.50, "Entradas", true),
                crearPlato(7, "Chianti Classico", 9.50, "Vinos", false)
        );

        response.put("platos", platos);
        response.put("count", platos.size());

        return response;
    }

    // Método GET para /api/platos/{id}
    @GetMapping("/{id}")
    public Map<String, Object> buscarPorId(@PathVariable Long id) {
        Map<String, Object> plato = crearPlato(id.intValue(), "Plato " + id, 10.99, "Generico", false);
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("plato", plato);
        return response;
    }

    // Método POST para /api/platos
    @PostMapping
    public Map<String, Object> crearPlato(@RequestBody Map<String, Object> platoData) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Plato creado correctamente");
        response.put("plato", platoData);
        return response;
    }

    // Método PUT para /api/platos/{id}
    @PutMapping("/{id}")
    public Map<String, Object> actualizarPlato(@PathVariable Long id, @RequestBody Map<String, Object> platoData) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Plato actualizado correctamente");
        response.put("id", id);
        response.put("plato", platoData);
        return response;
    }

    // Método DELETE para /api/platos/{id}
    @DeleteMapping("/{id}")
    public Map<String, Object> eliminarPlato(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Plato eliminado correctamente");
        response.put("id", id);
        return response;
    }

    // Método helper para crear platos mock
    private Map<String, Object> crearPlato(int id, String nombre, double precio, String categoria, boolean destacado) {
        Map<String, Object> plato = new HashMap<>();
        plato.put("id", id);
        plato.put("nombre", nombre);
        plato.put("descripcion", "Delicioso " + nombre.toLowerCase() + " preparado al estilo italiano");
        plato.put("precio", precio);
        plato.put("categoria", categoria);
        plato.put("categoriaId", obtenerCategoriaId(categoria));
        plato.put("imagen", "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60");
        plato.put("destacado", destacado);
        plato.put("ingredientes", Arrays.asList("Ingrediente 1", "Ingrediente 2", "Ingrediente 3"));
        plato.put("tiempoPreparacion", 20 + id * 5);
        return plato;
    }

    private int obtenerCategoriaId(String categoria) {
        if (categoria == null) return 1;
        switch(categoria.toLowerCase()) {
            case "entradas": return 1;
            case "pastas": return 2;
            case "carnes": return 3;
            case "pizzas": return 4;
            case "postres": return 5;
            case "vinos": return 6;
            default: return 7;
        }
    }
}

