package com.andrei.demo.controller;

import com.andrei.demo.model.Person;
import com.andrei.demo.repository.PersonRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/")
public class PersonController {

//    @Autowired (OLD WAY!!!)
    private final PersonRepository personRepository;

    public PersonController(PersonRepository personRepository){
        this.personRepository = personRepository;
    }

    @GetMapping("/home")
    public String home() {
        return "<h1>Hello!!</h1>";
    }

    @GetMapping("/persons")
    public ResponseEntity<List<Person>> getAll(){
        return ResponseEntity.ok(personRepository.findAll());
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

    @GetMapping("/persons/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable Long id){
        Person person = personRepository.findById(id).orElse(null);

        if(person != null){
            return ResponseEntity.ok(person);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/persons/{id}")
    public ResponseEntity<Void> updatePerson(@PathVariable Long id, @RequestBody Person updatedPerson){
        Person person = personRepository.findById(id).orElse(null);

        if(person != null) {
            person.setName(updatedPerson.getName());
            person.setAge(updatedPerson.getAge());
            personRepository.save(person);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/persons/{id}")
                    .buildAndExpand(person.getId())
                    .toUri();
            return ResponseEntity.created(location).build();
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/persons/{id}")
    public ResponseEntity<Person> deletePerson(@PathVariable Long id){
        personRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
