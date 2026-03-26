package com.andrei.demo.service;

import com.andrei.demo.model.Person;
import com.andrei.demo.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService {
    private PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository){
        this.personRepository = personRepository;
    }

    @Override
    public Person findPersonById(Long id){
        Optional<Person> res = personRepository.findById(id);

        Person person = null;

        if(res.isPresent()){
            person = res.get();
        } else {
            throw new RuntimeException("Person with id " + id + " not found");
        }

        return person;
    }

    @Override
    public void save(Person person){
        this.personRepository.save(person);
    }

    @Override
    public void deleteById(Long id){
        this.personRepository.deleteById(id);
    }

    @Override
    public List<Person> findAll() {
        return this.personRepository.findAll();
    }

}
