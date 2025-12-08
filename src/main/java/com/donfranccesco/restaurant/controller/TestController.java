package com.donfranccesco.restaurant.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
public class TestController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/")
    public String home() {
        return "¡La aplicación Restaurante está funcionando correctamente! 🎉";
    }

    @GetMapping("/health")
    public String health() {
        return "✅ Status: OK - Servicio activo";
    }

    @GetMapping("/test")
    public String test() {
        return "🔧 Endpoint de prueba - Todo funciona correctamente";
    }

    @GetMapping("/info")
    public String info() {
        return "📊 Información de la API:\n" +
                "- Nombre: Sistema Restaurante\n" +
                "- Estado: Activo\n" +
                "- Base de datos: Conectada\n" +
                "- Seguridad: Configurada";
    }

    @GetMapping("/db-test")
    public String dbTest() {
        try (Connection conn = dataSource.getConnection()) {
            return "✅ Base de datos CONECTADA correctamente\n" +
                    "📍 URL: " + conn.getMetaData().getURL() + "\n" +
                    "🛠️ Producto: " + conn.getMetaData().getDatabaseProductName() + "\n" +
                    "📋 Versión: " + conn.getMetaData().getDatabaseProductVersion();
        } catch (SQLException e) {
            return "❌ ERROR conectando a la base de datos: " + e.getMessage();
        }
    }

    @GetMapping("/db-tables")
    public String dbTables() {
        try {
            List<Map<String, Object>> tables = jdbcTemplate.queryForList("SHOW TABLES");

            if (tables.isEmpty()) {
                return "📭 No hay tablas en la base de datos";
            } else {
                StringBuilder result = new StringBuilder("📋 TABLAS ENCONTRADAS:\n");
                for (Map<String, Object> table : tables) {
                    result.append("• ").append(table.values().iterator().next()).append("\n");
                }
                return result.toString();
            }
        } catch (Exception e) {
            return "❌ ERROR listando tablas: " + e.getMessage();
        }
    }

    @GetMapping("/db-status")
    public String dbStatus() {
        try {
            jdbcTemplate.execute(
                    "CREATE TABLE IF NOT EXISTS test_conexion (id INT PRIMARY KEY, mensaje VARCHAR(255))"
            );

            jdbcTemplate.update(
                    "INSERT INTO test_conexion (id, mensaje) VALUES (1, '¡Conexión exitosa!') " +
                            "ON DUPLICATE KEY UPDATE mensaje='¡Conexión exitosa!'"
            );

            String mensaje = jdbcTemplate.queryForObject(
                    "SELECT mensaje FROM test_conexion WHERE id = 1", String.class
            );

            return "🎉 BASE DE DATOS FUNCIONANDO PERFECTAMENTE\n" +
                    "✅ Lectura/escritura: " + mensaje + "\n" +
                    "✅ JPA puede crear tablas automáticamente";

        } catch (Exception e) {
            return "❌ ERROR en operaciones de BD: " + e.getMessage();
        }
    }
}

