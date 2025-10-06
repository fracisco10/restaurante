FROM openjdk:17-jdk-slim
WORKDIR /app

# Instalar el driver de MySQL
RUN apt-get update && apt-get install -y wget && \
    wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-j-8.0.33.tar.gz && \
    tar -xzf mysql-connector-j-8.0.33.tar.gz && \
    mv mysql-connector-j-8.0.33/mysql-connector-j-8.0.33.jar /app/mysql-connector.jar && \
    rm -rf mysql-connector-j-8.0.33*

COPY target/restaurante-1.0.0.jar app.jar

# Agregar el connector al classpath
ENTRYPOINT ["java", "-cp", "app.jar:mysql-connector.jar", "org.springframework.boot.loader.launch.JarLauncher"]

EXPOSE 8080
