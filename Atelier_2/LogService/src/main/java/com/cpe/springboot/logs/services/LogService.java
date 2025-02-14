package com.cpe.springboot.logs.services;

import com.cpe.springboot.logs.models.LogModel;
import com.cpe.springboot.logs.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogService {
    private final LogRepository logRepository;

    @Autowired
    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    public void saveLog(LogModel logModel) {
        logRepository.save(logModel);
        System.out.println("[LOGSERVICE] [SAVELOG] log saved !");
    }

    public List<LogModel> getLogsBySenderAndReceiver(String sender, String receiver) {
        return logRepository.findBySenderAndReceiver(sender, receiver);
    }

}
