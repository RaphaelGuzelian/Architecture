package com.userapp.userservice.repository;

import com.userapp.userservice.models.UserModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<UserModel, String> {

    List<UserModel> findByLoginAndPwd(String login, String pwd);

}