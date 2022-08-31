const connection = require('./connection');

function findAllEmployees() {
  return connection
    .promise()
    .query(
      'SELECT s.first_name, s.last_name, role.title, department.name, role.salary, m.first_name AS manager FROM employee s JOIN role ON s.role_id=role.id JOIN department ON role.department_id=department.id LEFT JOIN employee m ON m.id=s.manager_id'
    );
}

function findAllDepartments() {
  return connection.promise().query('SELECT id, name FROM department');
}

function findAllRoles() {
  return connection
    .promise()
    .query(
      'SELECT role.id, title, salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id'
    );
}

async function addRole(data) {
  return connection.promise().query('INSERT into role SET ?', data);
}

async function addDepartment(data) {
  return connection.promise().query('INSERT into department SET ?', data);
}

async function addEmployee(data) {
  return connection.promise().query('INSERT into employee SET ?', data);
}

module.exports = {
  findAllDepartments,
  findAllEmployees,
  findAllRoles,
  addRole,
  addDepartment,
  addEmployee,
};
