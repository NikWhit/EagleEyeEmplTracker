DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
    );

CREATE TABLE position (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
    PRIMARY KEY (id)
);

    CREATE TABLE hired (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  position_id INT NULL,
  FOREIGN KEY (position_id)
    REFERENCES `position`(id)
    ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
    REFERENCES hired(id)
    ON DELETE SET NULL
);
-- CREATE TABLE employee (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     position_id INT,
--     manager_id INT,
--    DEFAULT NULL,
--     FOREIGN KEY (position_id) REFERENCES position(id),
--     FOREIGN KEY (manager_id) REFERENCES employee(id),
--     ON DELETE SET NULL,
--     PRIMARY KEY (id)

-- CREATE TABLE position (
--     id INT NOT NULL AUTO_INCREMENT,
--     title VARCHAR(30) NOT NULL,
--     salary DECIMAL,
--     department_id INT,
--     FOREIGN KEY (department_id)
--     REFERENCES department(id)
--     ON DELETE SET NULL,
--     PRIMARY KEY (id)
--     );

-- CREATE TABLE employee (
--     id INT NOT NULL AUTO_INCREMENT,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     position_id INT,
--     FOREIGN KEY (position_id)
--     REFERENCES position(id)ON DELETE SET NULL,
--     manager_id INT,
--     FOREIGN KEY (manager_id)
--     REFERENCES employee(id)
--     ON DELETE SET NULL,
--     PRIMARY KEY (id)
--     );

-- CREATE TABLE employee (
--     ->   id INT NOT NULL AUTO_INCREMENT,
--     ->   first_name VARCHAR(30) NOT NULL,
--     ->   last_name VARCHAR(30) NOT NULL,
--     ->   position_id INT,
--     ->   FOREIGN KEY (position_id)
--     ->   REFERENCES position(id)
--     ->   ON DELETE SET NULL,
--     ->   manager_id INT,
--     ->   FOREIGN KEY (manager_id)
--     ->   REFERENCES employee(id)
--     ->   ON DELETE SET NULL,
--     ->   PRIMARY KEY (id)
--     -> );


