FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copiar el JAR de la aplicación
COPY target/restaurante-1.0.0.jar app.jar

# En Spring Boot, el conector MySQL debe estar incluido en el JAR
# Si necesitas el conector, mejor agrégalo en pom.xml
ENTRYPOINT ["java", "-jar", "app.jar"]

EXPOSE 8080

