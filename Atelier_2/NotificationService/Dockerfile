# Utilisation d'une image de base contenant Java
FROM openjdk:20

# Création du répertoire de travail pour l'application dans le conteneur
RUN mkdir -p /app/NotificationService
WORKDIR /app/NotificationService

# Copie du fichier JAR de l'application dans le conteneur
COPY ./target/NotificationService-0.0.1-SNAPSHOT.jar NotificationService.jar

# Port sur lequel l'application Spring Boot écoute
EXPOSE 8084

# Commande pour démarrer l'application Spring Boot lors du démarrage du conteneur
CMD ["java", "-jar", "NotificationService.jar"]
