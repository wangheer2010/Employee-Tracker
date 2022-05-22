
// Import and require mysql2
const inquirer = require("inquirer");
const connection = require('./config/connection');

const firstPrompt = async() => {
  console.log('Welcome to the Employee Tracker!')
  await inquirer.prompt([
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
          viewAllEmployees(firstPrompt);
          break;
        case 'View All Roles':
          viewAllRoles(firstPrompt);
          break;
        case 'View All Departments':
          viewAllDepartments(firstPrompt);
          break;
        case 'Add Department':
          addDepartment(firstPrompt);
          break;
        case 'Add Role':
          addRole(firstPrompt);
          break;
        case 'Add Employee':
          addEmployee(firstPrompt);
          break;
        case 'Update Employee Role':
          updateEmployeeRole(firstPrompt);
          break;
        case 'Update Employee Manager':
          updateEmployeeManager(firstPrompt);
          break;
        case 'View Employees By Manager':
          viewEmployeesByManager(firstPrompt);
          break;
        case 'View Employees By Department':
          viewEmployeesByDepartment(firstPrompt);
          break;
        case 'Delete Employee':
          deleteEmployee(firstPrompt);
          break;
        case 'Delete Department':
          deleteDepartment(firstPrompt);
          break;
        case 'Delete Role':
          deleteRole(firstPrompt);
          break;
        case 'View the total utilized budget of a department':
          viewUtilizedBudgetByDepartment(firstPrompt);
          break;
        case 'Exit':
          connection.end();
          break;
        }
      })
};




