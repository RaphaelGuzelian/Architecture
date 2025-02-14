package com.userapp.userservice.repository;

import com.userapp.userservice.models.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<UserModel, Integer> {

    List<UserModel> findByLoginAndPwd(String login, String pwd);

}