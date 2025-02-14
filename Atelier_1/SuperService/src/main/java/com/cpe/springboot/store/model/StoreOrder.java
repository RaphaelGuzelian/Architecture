package com.cpe.springboot.store.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StoreOrder {
	@JsonProperty("userId")
	private int user_id;
	@JsonProperty("cardId")
	private int card_id;
	
	public StoreOrder() {
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public int getCard_id() {
		return card_id;
	}

	public void setCard_id(int card_id) {
		this.card_id = card_id;
	}
	
	

}
