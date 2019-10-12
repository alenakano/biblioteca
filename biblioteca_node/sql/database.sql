CREATE DATABASE node_mysql_ts;

CREATE TABLE usuarios(
    id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    email VARCHAR(50) NOT NULL,
    address VARCHAR(200) NOT NULL,
    complement VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    blocked BOOLEAN NOT NULL,
    date_block DATE,
    date_unblock DATE
) ENGINE=InnoDB;

DESCRIBE usuarios;

CREATE TABLE obras(
    id BIGINT NOT NULL PRIMARY KEY,
    isbn VARCHAR(13),
    issn VARCHAR(8),
    doi VARCHAR(11),
    category TINYINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    publisher VARCHAR(200) NOT NULL,
    controlId VARCHAR(13),
    local VARCHAR(200),
    type_mag VARCHAR(200),
    type_midia VARCHAR(200),
    type_other VARCHAR(200),
    author VARCHAR(200) NOT NULL,   
    location TEXT NOT NULL,
    date_acquisition DATE NOT NULL,
    type_book TINYINT NOT NULL,   
    country VARCHAR(20) NOT NULL,
    qtd TINYINT NOT NULL,
    description TEXT
);

DESCRIBE obras;