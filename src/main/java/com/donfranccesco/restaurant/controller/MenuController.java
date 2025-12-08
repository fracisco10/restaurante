package com.donfranccesco.restaurant.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MenuController {

    @GetMapping("/menu")
    public Map<String, Object> getMenu() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Menu obtenido correctamente");

        List<Map<String, Object>> platillos = Arrays.asList(
                crearPlatillo(1, "Spaghetti Carbonara", 16.99, "Pastas", true),
                crearPlatillo(2, "Pizza Margherita", 12.99, "Pizzas", true),
                crearPlatillo(3, "Tiramisu Classico", 7.99, "Postres", false),
                crearPlatillo(4, "Lasagna della Nonna", 18.50, "Pastas", true),
                crearPlatillo(5, "Bruschetta al Pomodoro", 8.99, "Entradas", false),
                crearPlatillo(6, "Carpaccio di Manzo", 14.50, "Entradas", true),
                crearPlatillo(7, "Chianti Classico", 9.50, "Vinos", false)
        );

        response.put("platillos", platillos);
        response.put("count", platillos.size());
        response.put("categorias", Arrays.asList("Antipasti", "Primi", "Secondi", "Pizza", "Dolci", "Vini", "Bevande"));

        return response;
    }

    private Map<String, Object> crearPlatillo(int id, String nombre, double precio, String categoria, boolean destacado) {
        Map<String, Object> platillo = new HashMap<>();
        platillo.put("id", id);
        platillo.put("nombre", nombre);
        platillo.put("descripcion", "Delicioso " + nombre.toLowerCase() + " preparado al estilo italiano");
        platillo.put("precio", precio);
        platillo.put("categoria", categoria);
        platillo.put("categoriaId", obtenerCategoriaId(categoria));
        platillo.put("imagen", "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60");
        platillo.put("destacado", destacado);
        platillo.put("ingredientes", Arrays.asList("Ingrediente 1", "Ingrediente 2", "Ingrediente 3"));
        platillo.put("tiempoPreparacion", 20 + id * 5);
        return platillo;
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