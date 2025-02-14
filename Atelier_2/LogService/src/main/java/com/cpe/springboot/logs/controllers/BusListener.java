package com.cpe.springboot.logs.controllers;


import com.cpe.springboot.logs.models.LogModel;
import com.cpe.springboot.logs.services.LogService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@Component
public class BusListener {

    @Autowired
    JmsTemplate jmsTemplate;

    @Autowired
    LogService logService;

    @JmsListener(destination = "BUS_LOGS", containerFactory = "connectionFactory")
    public void receiveMessageResult(String message) {
        try {
            // Convertir le message JSON en un objet LogModel
            ObjectMapper objectMapper = new ObjectMapper();
            LogModel logModel = objectMapper.readValue(message, LogModel.class);

            // Faire quelque chose avec l'objet LogModel
            System.out.println("[BUSLISTENER] [CHANNEL BUS_LOGS] RECEIVED LOG=[" + logModel + "]");
            logService.saveLog(logModel);
        } catch (Exception e) {
            // Gérer les erreurs de désérialisation
            System.err.println("Error deserializing message: " + e.getMessage());
        }
    }
}