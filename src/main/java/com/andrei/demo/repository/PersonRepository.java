package com.andrei.demo.repository;

import com.andrei.demo.model.Person;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class PersonRepository {
    private static List<Person> personList = new ArrayList<>();

    static {
        personList.add(new Person(1, "Vasile Albu", 67));
        personList.add(new Person(2, "Mihai Iacobescu", 55));
        personList.add(new Person(3, "Cristiano Ronaldo", 29));
        personList.add(new Person(4, "Max Verstappen", 102));
    }

    public List<Person> getAllPersons() {
        if(personList == null){
            personList = new ArrayList<>();
        }

        return personList;
    }

    public void save(Person person) {
        personList.add(person);
    }

    public void removeById(int id){
        personList.removeIf(person -> person.getId() == id);
    }
}
