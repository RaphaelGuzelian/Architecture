package com.lib.commonlib.models;

public class CardDTO extends CardBasics {
    private Integer id;
    private float energy;
    private float hp;
    private float defence;
    private float attack;
    private float price;
    private Integer userId;

    public CardDTO() {

    }

    public CardDTO(CardModel cModel) {
        super(cModel);
        this.id = cModel.getId();
        this.energy = cModel.getEnergy();
        this.hp = cModel.getHp();
        this.defence = cModel.getDefence();
        this.attack = cModel.getAttack();
        this.price = cModel.getPrice();
        if (cModel.getUser() != null) {
            this.userId = cModel.getUser().getId();
        } else {
            this.userId = null;
        }
    }

    public CardDTO(Integer id, float energy, float hp, float defence, float attack, float price, Integer userId) {
        this.id = id;
        this.energy = energy;
        this.hp = hp;
        this.defence = defence;
        this.attack = attack;
        this.price = price;
        this.userId = userId;
    }

    public CardDTO(CardBasics c, Integer id, float energy, float hp, float defence, float attack, float price, Integer userId) {
        super(c);
        this.id = id;
        this.energy = energy;
        this.hp = hp;
        this.defence = defence;
        this.attack = attack;
        this.price = price;
        this.userId = userId;
    }

    public CardDTO(String name, String description, String family, String affinity, String imgUrl, String smallImgUrl, Integer id, float energy, float hp, float defence, float attack, float price, Integer userId) {
        super(name, description, family, affinity, imgUrl, smallImgUrl);
        this.id = id;
        this.energy = energy;
        this.hp = hp;
        this.defence = defence;
        this.attack = attack;
        this.price = price;
        this.userId = userId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public float getEnergy() {
        return energy;
    }

    public void setEnergy(float energy) {
        this.energy = energy;
    }

    public float getHp() {
        return hp;
    }

    public void setHp(float hp) {
        this.hp = hp;
    }

    public float getDefence() {
        return defence;
    }

    public void setDefence(float defence) {
        this.defence = defence;
    }

    public float getAttack() {
        return attack;
    }

    public void setAttack(float attack) {
        this.attack = attack;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

}
