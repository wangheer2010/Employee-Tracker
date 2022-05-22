
// Import and require mysql2
const inquirer = require("inquirer");
const db = require("./config/connection");
const connection = require('./config/connection');

db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  firstPrompt();
});

const firstPrompt = function() {
  console.log('Welcome to the Employee Tracker!')
  inquirer.prompt([
    {
        type: 'list',
        name:'userChoice',
        message: 'What would you like to do?',
        choices: [
        'View All Employees',
        'View All Roles',
        'View All Departments',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View Employees By Manager',
        'View Employees By Department',
        'Delete Employee',
        'Delete Department',
        'Delete Role',
        'View the total utilized budget of a department',
        'Exit']
        
    }
    ]).then((res)=>{
      console.log(res.userChoice);
      switch(res.userChoice){
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        // case 'Update Employee Role':
        //   updateEmployeeRole();
        //   break;
        // case 'Update Employee Manager':
        //   updateEmployeeManager();
        //   break;
        // case 'View Employees By Manager':
        //   viewEmployeesByManager();
        //   break;
        // case 'View Employees By Department':
        //   viewEmployeesByDepartment();
        //   break;
        // case 'Delete Employee':
        //   deleteEmployee();
        //   break;
        // case 'Delete Department':
        //   deleteDepartment();
        //   break;
        // case 'Delete Role':
        //   deleteRole();
        //   break;
        // case 'View the total utilized budget of a department':
        //   viewUtilizedBudgetByDepartment();
        //   break;
        // case 'Exit':
        //   connection.end();
        //   break;
        }
      })
};

// For the view all options, here are the queries
const viewAllEmployeesQuery = 'SELECT * FROM employee';
const viewAllRolesQuery = 'SELECT * FROM role';
const viewAllDepartmentsQuery = 'SELECT * FROM department';

const viewAllEmployees = () => {
  db.query(viewAllEmployeesQuery, (err,res)=> {
    if (err) throw err;
    console.table(res);
    firstPrompt();
  });
}

const viewAllDepartments = () => {
  db.query(viewAllDepartmentsQuery, (err,res)=> {
    if (err) throw err;
    console.table(res);
    firstPrompt();
  });
}

const viewAllRoles = () => {
  db.query(viewAllRolesQuery, (err,res)=> {
    if (err) throw err;
    console.table(res);
    firstPrompt();
  });
}

