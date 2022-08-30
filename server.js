const inquirer = require('inquirer');

const {
  findAllEmployees,
  findAllDepartments,
  findAllRoles,
  addRole,
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
    .then((answers) => {
      if (answers.answer === 'view all departments') {
        viewAllDepartments();
      } else if (answers.answer === 'view all roles') {
        viewAllRoles();
      } else if (answers.answer === 'view all employees') {
        viewAllEmployees();
      } else if (answers.answer === 'add a department') {
      } else if (answers.answer === 'add a role') {
        promptAddRole();
      } else if (answers.answer === 'add an employee') {
      } else if (answers.answer === 'update an employee role') {
      } else {
        process.exit();
      }

      // Use user feedback for... whatever!!
    })
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

async function promptAddRole() {
  const deps = await findAllDepartments();
  const depsChoices = deps[0].map((dept) => ({
    name: dept.name,
    value: dept.id,
  }));
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

init();
