package com.andrei.demo.controller;

import com.andrei.demo.model.Person;
import com.andrei.demo.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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
    public ResponseEntity<Void> addPerson(@RequestBody Person person){
        personRepository.save(person);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/persons/{id}")
                .buildAndExpand(person.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/persons/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable int id, @RequestBody Person updatedPerson){
        for(Person person : personRepository.getAllPersons()){
            if(person.getId() == id){
                person.setAge(updatedPerson.getAge());
                URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/persons/{id}")
                        .buildAndExpand(person.getId())
                        .toUri();
                return ResponseEntity.created(location).build();
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/persons/{id}")
    public ResponseEntity<Person> deletePerson(@PathVariable int id){
        personRepository.removeById(id);
        return ResponseEntity.noContent().build();
    }
}
