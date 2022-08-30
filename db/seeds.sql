USE empTracker;

INSERT INTO department (name)
VALUES 
('Sales'),
('Accounting'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Director of Sales', 150000, 1),
('Director of Finance', 125000, 2),
('Director of Operations', 175000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Virginia', "Woolf", 1, NULL),
('Phillip', "Smith", 2, 1),
('Summer', "Thyme", 3, 1);