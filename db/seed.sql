USE employees_db;

INSERT INTO departments (name)
VALUES ('Sales'), ('Engineering'), ('Finance'),('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES 
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Account Manager', 160000, 3),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
  ('Albie', 'Wade', 1, null),
  ('Montgomery', 'Salas', 2, 1),
  ('Axel', 'Peck', 2, 1),
  ('Archie', 'Chan', 3, null),
  ('Usman', 'Rivera', 3, 4),
  ('Autumn', 'Cline', 4, null),
  ('Jade', 'French', 5, null),
  ('Johnathan', 'Blogs', 6, 7),
  ('Paula', 'Love', 7, null),
  ('Reuben', 'Delgao', 8, 9);
  