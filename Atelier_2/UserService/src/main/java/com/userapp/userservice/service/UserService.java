package com.userapp.userservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.userapp.userservice.models.DTOMapper;
import com.userapp.userservice.models.UserDTO;
import com.userapp.userservice.models.UserModel;
import com.userapp.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class UserService {
    @Autowired
    JmsTemplate jmsTemplate;

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public UserService(UserRepository userRepository, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.restTemplate = restTemplate;
    }

    public List<UserModel> getAllUsers() {
        List<UserModel> userList = new ArrayList<>();
        userRepository.findAll().forEach(userList::add);
        return userList;
    }

    public Optional<UserModel> getUser(String id) {
        return userRepository.findById(id);
    }

    public void sendMsg(UserDTO userDTO) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+userDTO+"]");
        jmsTemplate.convertAndSend("RESULT_BUS_MNG",userDTO);
    }

    public void sendMsg(UserDTO userDTO, String busName) {
        System.out.println("[BUSSERVICE] SEND String MSG=["+userDTO+"] to Bus=["+busName+"]");
        jmsTemplate.convertAndSend(busName,userDTO);
    }


    public UserDTO addUser(UserDTO user) {
        UserModel u = new UserModel(user);
        UserModel uBd = userRepository.save(u);

        // Appeler la méthode getRandCard de SuperService
        ResponseEntity<List<Integer>> response = restTemplate.exchange(
                "http://localhost/superservice/getRandCard?quantity=5&userId=" + uBd.getId(),
                HttpMethod.POST,
                null,
                new ParameterizedTypeReference<List<Integer>>() {}
        );

        List<Integer> cardIds = response.getBody();
        if (cardIds != null) {
            for (Integer cardId : cardIds) {
                uBd.addCard(cardId);
            }
        }
        System.out.println("[USERSERVICE] : " + uBd.getId() + " a reçu les cartes : " + cardIds);
        userRepository.save(uBd);
        return DTOMapper.fromUserModelToUserDTO(uBd);
    }


    public UserDTO updateUser(UserDTO user) {
        UserModel u = new UserModel(user);
        UserModel uBd =userRepository.save(u);
        return DTOMapper.fromUserModelToUserDTO(uBd);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public List<UserModel> getUserByLoginPwd(String login, String pwd) {
        List<UserModel> ulist = null;
        ulist = userRepository.findByLoginAndPwd(login, pwd);
        return ulist;
    }

}
