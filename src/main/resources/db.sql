drop table persons;

create table persons (
    id integer generated always as identity primary key,
    name varchar(60),
    age integer
);

insert into persons (name, age) values ('Max Verstappen', 32);
insert into persons (name, age) values ('John Doe', 67);
insert into persons (name, age) values ('Jack Bauer', 39);
insert into persons (name, age) values ('Michael Jordan', 66);
insert into persons (name, age) values ('Cristiano Ronaldo', 40);
insert into persons (name, age) values ('Spongebob Squarepants', 40);

select * from persons;