package com.notifapp.notificationservice.service;

import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public String processInscription(String message) {
        // Effectuer le traitement d'inscription
        
        // Renvoyer un message de confirmation
        return "Inscription confirmée!";
    }
}
