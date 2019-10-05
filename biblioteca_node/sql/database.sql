CREATE DATABASE node_mysql_ts;

CREATE TABLE posts(
    id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE posts;

CREATE TABLE obras(
    id BIGINT NOT NULL PRIMARY KEY,
    isbn VARCHAR(13),
    issn VARCHAR(8),
    doi VARCHAR(11),
    category TINYINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    publisher VARCHAR(200) NOT NULL,
    local VARCHAR(200),
    type_mag VARCHAR(200),
    author VARCHAR(200) NOT NULL,   
    location TEXT NOT NULL,
    date_acquisition DATE NOT NULL,
    type_book TINYINT NOT NULL,   
    country VARCHAR(20) NOT NULL,
    qtd TINYINT NOT NULL,
    description TEXT
);

DESCRIBE obras;