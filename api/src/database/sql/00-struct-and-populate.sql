CREATE DATABASE IF NOT EXISTS dmdb;
USE dmdb;
CREATE TABLE IF NOT EXISTS categories (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS devices (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         category_id INT NOT NULL,
                         color VARCHAR(16) NOT NULL,
                         part_number INT NOT NULL,
                         FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (id, name)
VALUES (1,'Alpha'),
       (2,'Omega'),
       (3,'Beta');

INSERT INTO devices (id, category_id, color, part_number)
VALUES (1,1,'Azul',225),
       (2,1,'Cinza',6),
       (3,2,'Preto',27),
       (4,2,'Azul',16),
       (5,2,'Verde',55),
       (6,3,'Rosa',4),
       (7,3,'Branco',77),
       (8,3,'Preto',12),
       (9,3,'Laranja',10);
