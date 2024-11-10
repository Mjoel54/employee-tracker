DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

\c staff_db;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_name VARCHAR(30),
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);

INSERT INTO employees (first_name, last_name, role_id, manager_name) VALUES
('John', 'Doe', 1, 'Jane Smith'),
('Alice', 'Johnson', 2, 'John Doe'),
('Bob', 'Brown', 3, 'Alice Johnson');