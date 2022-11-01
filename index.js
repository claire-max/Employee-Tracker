const mysql = require('mysql2')
const inquirer = require('inquirer')
require('console.table')

const db = require('./db/connection')
const connection = require('./db/connection')
start()
function start() {
  inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Remove a department",
        "Remove a role",
        "Remove an employee",
        "Update employee roles",
        "Exit"
      ]
    }])
    .then(function (answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a new department":
          addDepartment();
          break;
        case "Add a new role":
          addRole();
          break;
        case "Add a new employee":
          addEmployee();
          break;
        case "Remove a department":
          removeDepartment();
          break;

        case "Remove a role":
          removeRole();
          break;
        case "Remove an employee":
          removeEmployee();
          break;
        case "Update employee roles":
          updateEmpRole();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
};


//View Functions
function viewDepartments() {
  db.query('SELECT * FROM departments', function (err, res) {
    if (err) throw err;
    console.table(res)
    start()
  })
}
function viewRoles() {
  db.query('SELECT * FROM roles', function (err, res) {
    if (err) throw err;
    console.table(res)
    start()
  })
}
function viewEmployees() {
  db.query('SELECT * FROM employees', function (err, res) {
    if (err) throw err;
    console.table(res)
    start()
  })
}


//Add Functions
function addDepartment() {
  inquirer.prompt([
    {
      name: 'addDepartment',
      message: 'Name of Department you wish to add:'
    }
  ]).then(function (answer) {
    db.query('INSERT INTO departments SET ?', {
      name: answer.addDepartment
    }, function (err, res) {
      if (err) throw err;
      console.table(res)
      start()
    })
  }
  )
}
const addRole = () => {
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Name of role you wish to add:'
      },
      {
        type: 'number',
        name: 'salary',
        message: 'Salary for role:'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Department ID:',
        choices: departments.map(department => ({
          name: `${department.name}`,
          value: department.id
        }))
      }
    ]).then(function (answers) {
      db.query('INSERT INTO roles SET ?', {
        title: answers.title,
        salary: answers.salary,
        departmentId: answers.departmentId
      }, function (err, res) {
        if (err) throw err;
        console.table(res)
        start()
      })
    })
  })
}
const addEmployee = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'First Name:'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Last Name:'
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Role ID:',
        choices: roles.map(role => ({
          name: `${role.title}`,
          value: role.id
        }))
      }
      //need to work out how to make managerId optional
    ]).then(function (answers) {
      db.query('INSERT INTO employees SET ?', {
        firstName: answers.firstName,
        lastName: answers.lastName,
        roleId: answers.roleId,
        //managerId null for now
        managerId: null
      }, function (err, res) {
        if (err) throw err;
        console.table(res)
        start()
      })
    })
  })
}


//Remove functions
function removeDepartment() {
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: "list",
        name: "removeDep",
        message: "Select the department which will be removed",
        choices: departments.map(department => ({
          name: `${department.name}`,
          value: department.id
        }))
      }
    ]).then(function (answer) {
      db.query(`DELETE FROM departments WHERE id = ${answer.removeDep}`
        , function (err, res) {
          if (err) throw err
          console.log('Department removed!')
          start()
        })
    })
  })
}
function removeRole() {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: "list",
        name: "removeRole",
        message: "Select the role which will be removed",
        choices: roles.map(role => ({
          name: `${role.title}`,
          value: role.id
        }))
      }
    ]).then(function (answer) {
      db.query(`DELETE FROM roles WHERE id = ${answer.removeRole}`
        , function (err, res) {
          if (err) throw err
          console.log('Role removed!')
          start()
        })
    })
  })
}
function removeEmployee() {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) { console.log(err) }
    inquirer.prompt([
      {
        type: "list",
        name: "removeEmp",
        message: "Select the employee which will be removed",
        choices: employees.map(employee => ({
          name: `${employee.firstName} ${employee.lastName}`,
          value: employee.id
        }))
      }
    ]).then(function (answer) {
      db.query(`DELETE FROM employees WHERE id = ${answer.removeEmp}`
        , function (err, res) {
          if (err) throw err
          console.log('Employee removed!')
          start()
        })
    })
  })
}

//update employee role function
function updateEmpRole() {

  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) { console.log(err) }
    db.query(`SELECT * FROM roles`, (err, roles) => {
      if (err) { console.log(err) }
      inquirer.prompt([
        {
          type: "list",
          name: "selectEmp",
          message: "Select the employee who's role will be updated",
          choices: employees.map(employee => ({
            name: `${employee.firstName} ${employee.lastName} - Role ID:${employee.roleId}`,
            value: employee.id
          }))
        },
        {
          type: 'list',
          name: 'updatedRole',
          message: 'New Role ID:',
          choices: roles.map(role => ({
            name: `${role.title}`,
            value: role.id
          }))
        }
      ]).then(function (answers) {
        db.query('UPDATE employees SET ? WHERE ?', [{ roleId: answers.updatedRole }, { id: answers.selectEmp }], function (err, res) {
          if (err) throw err
          console.log('Employee role updated!')
          start()
        })
      })
    })
  })
}