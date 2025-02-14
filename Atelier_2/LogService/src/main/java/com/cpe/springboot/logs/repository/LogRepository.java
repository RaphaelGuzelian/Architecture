package com.cpe.springboot.logs.repository;

import com.cpe.springboot.logs.models.LogModel;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LogRepository extends CrudRepository<LogModel, Integer> {
    List<LogModel> findBySenderAndReceiver(String sender, String receiver);
}
