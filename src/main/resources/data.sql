drop table if exists persons;
DROP TABLE IF EXISTS authorities;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    enabled BOOLEAN NOT NULL
);

CREATE TABLE authorities (
    username VARCHAR(255) NOT NULL,
    authority VARCHAR(255) NOT NULL,
    CONSTRAINT fk_authorities_users FOREIGN KEY (username) REFERENCES users (username)
);

CREATE UNIQUE INDEX ix_auth_username ON authorities (username, authority);

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
select * from authorities;