package com.cpe.springboot.logs.controllers;

import com.cpe.springboot.logs.models.LogModel;
import com.cpe.springboot.logs.services.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class LogRestController {
    @Autowired
    private final LogService logService;

    public LogRestController(LogService logService) {
        this.logService = logService;
    }

    @RequestMapping(method= RequestMethod.GET,value="/logs/{sender}/{receiver}")
    private List<LogModel> getLogs(@PathVariable String sender,@PathVariable String receiver) {
        return logService.getLogsBySenderAndReceiver(sender, receiver);
    }

}
