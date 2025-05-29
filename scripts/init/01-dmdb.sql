USE dmdb;

CREATE TABLE categories (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(128) NOT NULL
);

CREATE TABLE devices (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         category_id INT NOT NULL,
                         color VARCHAR(16) NOT NULL,
                         part_number INT NOT NULL,
                         FOREIGN KEY (category_id) REFERENCES categories(id)
);
