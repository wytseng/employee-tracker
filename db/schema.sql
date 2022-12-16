DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  INDEX dept_id (department_id),
  CONSTRAINT fk_role_department FOREIGN KEY (department_id) REFERENCES departments(id)
  ON DELETE CASCADE
);

CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  INDEX role_ind (role_id),
  CONSTRAINT fk_employee_role FOREIGN KEY (role_id) REFERENCES roles(id)
  ON DELETE CASCADE,
  INDEX manager_ind (manager_id),
  CONSTRAINT fk_employee_man FOREIGN KEY (manager_id) REFERENCES employees(id)
  ON DELETE SET NULL
);
