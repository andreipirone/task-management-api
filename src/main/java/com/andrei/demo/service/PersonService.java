package com.andrei.demo.service;

import com.andrei.demo.model.Person;

import java.util.List;

public interface PersonService {
    public Person findPersonById(Long id);
    public void save(Person person);
    public void deleteById(Long id);
    public List<Person> findAll();
}
