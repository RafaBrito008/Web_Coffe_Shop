CREATE DATABASE appCoffee_DB;

USE appCoffee_DB;

--users table
CREATE TABLE users(
    id INT(11) NOT NULL PRIMARY KEY,
    username VARCHAR(16) NOT NULL ,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

--orders table
CREATE TABLE orders(
    id INT(11) NOT NULL PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    fechaPedido timestamp NOT NULL DEFAULT current_timestamp,
    fechaEntrega DATE,
    user_id INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE orders
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
