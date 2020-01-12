DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);


INSERT INTO department (name)
VALUES ('Accounting'), ('HR');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 100, 1), ('Bookkeeper', 50, 1), ('HR Specialist', 50, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tad', 'Hemingway', 1, 1), ('Cris', 'Lewis', 2, 1);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
