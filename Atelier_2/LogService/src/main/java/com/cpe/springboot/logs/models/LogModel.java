package com.cpe.springboot.logs.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class LogModel implements Serializable {
    private String sender;
    private String receiver;
    private String message;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    public LogModel() {
    }

    public LogModel(String sender, String receiver, String message) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return display();
    }

    public String display(){
        String result;
        result="LogModel{" +
                "sender='" + getSender() + '\'' +
                ", receiver='" + getReceiver() + '\'' +
                ", message='" + getMessage() + '\'' +
                '}';

        return result;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
