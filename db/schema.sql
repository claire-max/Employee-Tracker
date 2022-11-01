DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY NOT NULL,
 title VARCHAR(30) NOT NULL,
 salary DECIMAL NOT NULL,
 department_id INT,
FOREIGN KEY (departmentId) REFERENCES departments(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY(roleId) REFERENCES roles(id),
  FOREIGN KEY(managerId) REFERENCES employees(id)
);