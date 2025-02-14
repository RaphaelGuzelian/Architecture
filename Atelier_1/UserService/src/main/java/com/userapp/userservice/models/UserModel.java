package com.userapp.userservice.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class UserModel implements Serializable {

    private static final long serialVersionUID = 2733795832476568049L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String login;
    private String pwd;
    private float account;
    private String lastName;
    private String surName;
    private String email;


    /*@OneToMany(cascade = CascadeType.ALL,
            mappedBy = "user")
    //@OneToMany(mappedBy = "user")
    private Set<CardModel> cardList = new HashSet<>();*/
    @ElementCollection
    @CollectionTable(name = "user_card_ids", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "card_id")
    private Set<Integer> cardIds = new HashSet<>();

    public UserModel() {
        this.login = "";
        this.pwd = "";
        this.lastName="lastname_default";
        this.surName="surname_default";
        this.email="email_default";
    }

    public UserModel(String login, String pwd) {
        super();
        this.login = login;
        this.pwd = pwd;
        this.lastName="lastname_default";
        this.surName="surname_default";
        this.email="email_default";
    }

    public UserModel(UserDTO user) {
        this.id=user.getId();
        this.login=user.getLogin();
        this.pwd=user.getPwd();
        this.account=user.getAccount();
        this.lastName=user.getLastName();
        this.surName=user.getSurName();
        this.email=user.getEmail();
        for(Integer cardId: user.getCardList()){
            this.cardIds.add(cardId);
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Set<Integer> getCardIds() {
        return cardIds;
    }

    public void setCardList(Set<Integer> newCardIds) {
        this.cardIds = newCardIds;
    }

    public void addAllCardList(Collection<Integer> cardIdsAdded) {
        this.cardIds.addAll(cardIdsAdded);
    }


    public void addCard(Integer id) {
        this.cardIds.add(id); // PENSER A SET USER DANS LA CARD D'ID id
    }

    private boolean checkIfCard(Integer idToCheck){
        for(Integer id: this.cardIds){
            if(id == idToCheck){
                return true;
            }
        }
        return false;
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

}
