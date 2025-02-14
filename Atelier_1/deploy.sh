#!/bin/bash

# Fonction pour vérifier si Docker est installé
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo "Docker n'est pas installé. Installation en cours..."
        # Installation de Docker
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        echo "Docker a été installé avec succès."
    else
        echo "Docker est déjà installé."
    fi
}

# Fonction pour vérifier si Docker Compose est installé
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        echo "Docker Compose n'est pas installé. Installation en cours..."
        # Installation de Docker Compose
        sudo curl -L "https://github.com/docker/compose/releases/download/2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        echo "Docker Compose a été installé avec succès."
    else
        echo "Docker Compose est déjà installé."
    fi
}

# Vérification et installation de Docker et Docker Compose
check_docker
check_docker_compose

# Construction des images Docker
echo "Construction des images Docker..."
docker-compose build

# Construction du projet Maven
echo "Construction du projet Maven..."
cd UserService/  # Aller dans le répertoire du projet Maven
mvn package       # Exécuter la commande 'mvn package'
cd ..             # Retourner au répertoire racine
cd SuperService/  # Aller dans le répertoire du projet Maven
mvn package       # Exécuter la commande 'mvn package'
cd ..             # Retourner au répertoire racine
cd NotificationService/  # Aller dans le répertoire du projet Maven
mvn package       # Exécuter la commande 'mvn package'
cd ..             # Retourner au répertoire racine


# Démarrage des conteneurs
echo "Démarrage des conteneurs..."
docker-compose up -d

# Vérification de l'état des conteneurs
echo "Vérification de l'état des conteneurs..."
docker-compose ps

# Démarrage du serveur Vite après le démarrage des conteneurs
#echo "Démarrage du serveur Vite..."

#cd StaticService/
#npm install
#npm run dev
