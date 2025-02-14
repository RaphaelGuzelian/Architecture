package com.cpe.springboot.store.controller;

import com.cpe.springboot.card.Controller.CardModelService;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.store.model.StoreAction;
import com.cpe.springboot.store.model.StoreTransaction;
import com.cpe.springboot.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StoreService {

	private final RestTemplate restTemplate;
	private final String userServiceUrl = "http://localhost/userservice"; // URL du UserService

	private final CardModelService cardService;
	private final StoreRepository storeRepository;

	@Autowired
	public StoreService(CardModelService cardService, RestTemplate restTemplate, StoreRepository storeRepository) {
		this.cardService = cardService;
		this.restTemplate = restTemplate;
		this.storeRepository = storeRepository;
	}

	public boolean buyCard(Integer user_id, Integer card_id) {
		//UserModel u = restTemplate.getForObject(userServiceUrl + "/users/" + user_id, UserModel.class);
		ResponseEntity<UserDTO> response = restTemplate.exchange(
				userServiceUrl+ "/user/" + user_id,
				HttpMethod.GET,
				null,
				new ParameterizedTypeReference<UserDTO>() {}
		);
		UserDTO u = response.getBody();
		Optional<CardModel> c_option = cardService.getCard(card_id);
		if (u == null || !c_option.isPresent()) {
			return false;
		}
		CardModel c = c_option.get();
		if (u.getAccount() > c.getPrice()) {
			u.addCard(c);
			u.setAccount(u.getAccount() - c.getPrice());
			restTemplate.put(userServiceUrl + "/user/" + user_id, u);
			StoreTransaction sT = new StoreTransaction(user_id, card_id, StoreAction.BUY);
			storeRepository.save(sT);
			System.out.println("[STORE SERVICE] user = " + u);
			return true;
		} else {
			return false;
		}
	}

	public boolean sellCard(Integer user_id, Integer card_id) {
		//UserModel u = restTemplate.getForObject(userServiceUrl + "/users/" + user_id, UserModel.class);
		ResponseEntity<UserDTO> response = restTemplate.exchange(
				userServiceUrl+ "/user/" + user_id,
				HttpMethod.GET,
				null,
				new ParameterizedTypeReference<UserDTO>() {}
		);
		UserDTO u = response.getBody();
		Optional<CardModel> c_option = cardService.getCard(card_id);
		if (u == null || !c_option.isPresent()) {
			return false;
		}
		CardModel c = c_option.get();

		c.setUser(null);
		cardService.updateCard(c);
		u.setAccount(u.getAccount() + c.computePrice());
		restTemplate.put(userServiceUrl + "/user/" + user_id, u);
		StoreTransaction sT = new StoreTransaction(user_id, card_id, StoreAction.SELL);
		storeRepository.save(sT);
		return true;
	}

	public List<StoreTransaction> getAllTransactions() {
		List<StoreTransaction> sTList = new ArrayList<>();
		this.storeRepository.findAll().forEach(sTList::add);
		return sTList;

	}

}
