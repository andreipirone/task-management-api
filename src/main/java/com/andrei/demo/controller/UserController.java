package com.andrei.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @GetMapping("/user")
    public String user(){
        return "Hi, user!";
    }

    @GetMapping("/admin")
    public String admin(){
        return "Hi, admin!";
    }
}
