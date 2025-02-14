package com.notifapp.notificationservice.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.notifapp.notificationservice.service.NotificationService;

@Controller
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @MessageMapping("/inscription")
    @SendTo("/topic/confirmationInscription")
    public String confirmationInscription(String message) {
        return notificationService.processInscription(message);
    }
}
