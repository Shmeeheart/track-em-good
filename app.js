const inquirer = require('inquirer');
// const db = require('./db/connection');

const {
  findAllEmployees,
  findAllDepartments,
  findAllRoles,
  addRole,
  addDepartment,
  addEmployee,
} = require('./db/index');

function init() {
  inquirer
    .prompt([
      {
        /* Pass your questions in here */
        type: 'list',
        name: 'answer',
        message: 'Pick an option',
        choices: [
          'view all departments',
          'view all roles',
          'view all employees',
          'add a department',
          'add a role',
          'add an employee',
          'update an employee role',
          'done',
        ],
      },
    ])
    .then(
      (answers) => {
        if (answers.answer === 'view all departments') {
          viewAllDepartments();
        } else if (answers.answer === 'view all roles') {
          viewAllRoles();
        } else if (answers.answer === 'view all employees') {
          viewAllEmployees();
        } else if (answers.answer === 'add a department') {
          promptAddDepartment();
        } else if (answers.answer === 'add a role') {
          promptAddRole();
        } else if (answers.answer === 'add an employee') {
          promptAddEmployee();
        } else if (answers.answer === 'update an employee role') {
          promptUpdateRole();
        } else if (answers.answer === 'done') {
          process.exit();
        }
      }

      // Use user feedback for... whatever!!
    )
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

function viewAllEmployees() {
  findAllEmployees().then(([employees]) => {
    console.table(employees);
    init();
  });
}

async function viewAllDepartments() {
  const deps = await findAllDepartments();
  console.table(deps[0]);
  init();
}

async function viewAllRoles() {
  const rols = await findAllRoles();
  console.table(rols[0]);
  init();
}

async function promptAddDepartment() {
  const newDepartment = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
    },
  ]);

  const newDept = await addDepartment(newDepartment);
  console.log('You just created a new department!');
  init();
}

async function promptAddRole() {
  const deps = await findAllDepartments();
  const depsChoices = deps[0].map((deps) => ({
    name: deps.name,
    value: deps.id,
  }));
  console.log(depsChoices);
  const newRole = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the role title?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Choose the appropriate department',
      choices: depsChoices,
    },
  ]);
  const db = await addRole(newRole);
  console.log('You just created a new role!');
  init();
}

async function promptAddEmployee() {
  const roles = await findAllRoles();
  const mngs = await findAllEmployees();
  console.log(mngs[0]);
  const rolesChoices = roles[0].map((role) => ({
    name: role.title,
    value: role.id,
  }));
  console.log(rolesChoices);
  const mngChoices = mngs[0].map((manager) => ({
    name: manager.first_name,
    value: manager.id,
  }));
  console.log(mngChoices);
  const newEmployee = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the employee?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the employee?',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Choose the appropriate role',
      choices: rolesChoices,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Choose the appropriate manager',
      choices: mngChoices,
    },
  ]);
  const db = await addEmployee(newEmployee);
  console.log('You just created a new employee!');
  init();
}

init();
