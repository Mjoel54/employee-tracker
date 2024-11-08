INSERT INTO departments (name) VALUES 
('Engineering'),
('Human Resources'),
('Marketing');

INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('HR Manager', 60000, 2),
('Marketing Specialist', 50000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_name) VALUES
('John', 'Doe', 1, 'Jane Smith'),
('Alice', 'Johnson', 2, 'John Doe'),
('Bob', 'Brown', 3, 'Alice Johnson');