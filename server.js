
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
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Update Employee Manager':
          updateEmployeeManager();
          break;
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

// For the 3 adding queries
function addDepartment() { 
  inquirer.prompt([
      {
          name: "name",
          type: "input",
          message: "What department would you like to add?"
      }
  
  ]).then(function(answers) {
      db.query('INSERT INTO department SET ?',
          {
              name: answers.name
          },
          function(err, res) {
              if (err) throw err;
              console.log(`New department added successfully!`);
              firstPrompt();
          }
      )
  })
}

function addRole() { 
  inquirer.prompt([
      {
          name: "title",
          type: "input",
          message: "What role would you like to add?",
      },
      {
          name: "salary",
          type: "input",
          message: "What is the salary for the new role?",
      },
      {
          name: "department_id",
          type: "input",
          message: "Please enter id of the department for this role",
      }
  
  ]).then(function(answers) {
      db.query('INSERT INTO role SET ?',
          {
              title: answers.title,
              salary: answers.salary,
              department_id: answers.department_id
          },
          function(err, res) {
              if (err) throw err;
              console.log(`New role added successfully!`);
              firstPrompt();
          }
      )
  })
}

function addEmployee() { 
  inquirer.prompt([
      {
          name: "first_name",
          type: "input",
          message: "What's the employee's first name?",
      },
      {
          name: "last_name",
          type: "input",
          message: "What's the employee's last name?",
      },
      {
          name: "role_id",
          type: "input",
          message: "What's the employee's role id?",
      },
      {
          name: "manager_id",
          type: "input",
          message: "What's the employee manager's id?",
      }
  
  ]).then(function(answers) {
      db.query('INSERT INTO employee SET ?',
          {
              first_name: answers.first_name,
              last_name: answers.last_name,
              role_id: answers.role_id,
              manager_id: answers.manager_id
          },
          function(err, res) {
              if (err) throw err;
              console.log(`New employee added successfully!`);
              firstPrompt();
          }
      )
  })
  }
  
  //if update employee role is selected
  function updateEmployeeRole() { 
    inquirer.prompt([
      {
          name: "id",
          type: "input",
          message: "What is the employee's id?",
      },
      {
          name: "role_id",
          type: "input",
          message: "What is the employee's role id?",
      }
  
  ]).then(function(role_id, id) {
      let query = 'UPDATE employee SET role_id = ? WHERE id = ?'
      let params = [role_id, id]
  
      db.query(query, params, (err, res) => {
          if (err) throw err;
          console.log(`Employee's role updated successfully!`);
      })
      firstPrompt();
  })
}

updateEmployeeManager()