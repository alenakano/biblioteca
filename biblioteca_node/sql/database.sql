CREATE DATABASE node_mysql_ts;

CREATE TABLE posts(
    id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE posts;

CREATE TABLE livros(
    isbn VARCHAR(13) NOT NULL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(200) NOT NULL,   
    location TEXT NOT NULL,
    date_acquisition DATE NOT NULL,
    type_book TINYINT NOT NULL,   
    country VARCHAR(20) NOT NULL,
    qtd TINYINT NOT NULL,
    description TEXT
);

DESCRIBE livros;