USE empTracker;

-- SELECT s.first_name, s.last_name, role.title, department.name, role.salary, m.first_name
-- FROM employee s
-- JOIN role ON s.role_id=role.id
-- JOIN department ON role.department_id=department.id
-- LEFT JOIN employee m ON m.id=s.manager_id;