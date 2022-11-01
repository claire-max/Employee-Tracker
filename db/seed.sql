USE employees_db;

INSERT INTO department (name)
VALUES
   ('Legal'),
   ('Insurance'),
   ('Engineering'),
   ('Finance'),
   ('Management');

INSERT INTO role (title, salary, department_id)
VALUES 
   ('Accountant', 150000, 1),
   ('Lead Engineer', 130000, 2),
   ('Software Engineer', 125000, 3),
   ('Sales Lead', 170000, 4),
   ('Legal Team Lead', 180000, 5),
   ('Manager', 100000,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
   ('Mary', 'May', 3,NULL),
   ('Larry', 'Bird', 2,1),
   ('Billy', 'Bob', 4,NULL),
   ('Beth', 'Blue', 5,3),
   ('Blake', 'Brown', 1,NULL),
   ('Jane', 'Johnson', 5,2),
   ('Claire', 'Cleo', 4,NULL),
   ('Jerry', 'Joy', 2,7);


