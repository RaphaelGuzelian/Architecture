package com.cpe.springboot.user;

import com.cpe.springboot.card.model.CardModel;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class UserDTO implements Serializable {
    @JsonProperty("userId")
    private String id;
    @JsonProperty("userLogin")
    private String login;
    @JsonProperty("userPwd")
    private String pwd;
    @JsonProperty("userAccount")
    private float account;
    @JsonProperty("userLastName")
    private String lastName;
    @JsonProperty("userSurname")
    private String surName;
    @JsonProperty("userEmail")
    private String email;
    private Set<Integer> cardList = new HashSet<>();

    public UserDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public Set<Integer> getCardList() {
        return cardList;
    }

    public void setCardList(Set<Integer> cardList) {
        this.cardList = cardList;
    }

    public float getAccount() {
        return account;
    }

    public void setAccount(float account) {
        this.account = account;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void addCard(CardModel c) {
        cardList.add(c.getId());
    }
    public void removeCard(CardModel c) {
        cardList.remove(c.getId());
    }

    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", login='" + login + '\'' +
                ", pwd='" + pwd + '\'' +
                ", account=" + account +
                ", lastName='" + lastName + '\'' +
                ", surName='" + surName + '\'' +
                ", email='" + email + '\'' +
                ", cardList=" + cardList +
                '}';
    }
}
