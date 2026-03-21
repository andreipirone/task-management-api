package com.andrei.demo.controller;

import com.andrei.demo.model.Person;
import com.andrei.demo.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/")
public class PersonController {
    @Autowired
    PersonRepository personRepository;

    private List<Person> personList = new ArrayList<>();

    @GetMapping("/home")
    public String home() {
        return "<h1>I hate macroeconomics, peag, sgbd, sdd, i hate school so fucking much</h1>";
    }

    @GetMapping("/persons")
    public ResponseEntity<List<Person>> getAll(){
        return ResponseEntity.ok(personRepository.getAllPersons());
    }

    @PostMapping("/persons")
    public String addPerson(@RequestBody Person person){
        personList.add(person);
        return "Data Inserted Successfully";
    }

    @PutMapping("/persons/{id}")
    public String updatePerson(@PathVariable int id, @RequestBody Person updatedPerson){
        for(Person person : personList){
            if(person.getId() == id){
                person.setAge(updatedPerson.getAge());
                return "Data Updated Successfully";
            }
        }
        return "Detail not found!";
    }

    @DeleteMapping("/persons/{id}")
    public String deletePerson(@PathVariable int id){
        personList.removeIf(person -> person.getId() == id);
        return "Data Deleted Successfully";
    }
}
