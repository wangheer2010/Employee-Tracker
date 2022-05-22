
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
        case 'View Employees By Manager':
          viewEmployeesByManager();
          break;
        case 'View Employees By Department':
          viewEmployeesByDepartment();
          break;
        case 'Delete Employee':
          deleteEmployee();
          break;
        case 'Delete Department':
          deleteDepartment();
          break;
        case 'Delete Role':
          deleteRole();
          break;
        case 'View the total utilized budget of a department':
          viewUtilizedBudgetByDepartment();
          break;
        case 'Exit':
          connection.end();
          break;
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


// Update queries
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

function updateEmployeeManager() {
  inquirer.prompt([
    {
        name: "id",
        type: "input",
        message: "What is the employee's id?",
    },
    {
        name: "manager_id",
        type: "input",
        message: "What is the employee's manager id?",
    }
  ]).then(function(manager_id, id) {
      let query = 'UPDATE employee SET manager_id = ? WHERE id = ?'
      let params = [manager_id, id]
  
      db.query(query, params, (err, res) => {
          if (err) throw err;
          console.log(`Employee's manager updated successfully!`);
      })
      firstPrompt();
  })
}
// View Employees By Department
function viewEmployeesByManager() {
  inquirer.prompt([
    {
        name: "manager_id",
        type: "input",
        message: "What is the manager id?",
    }
  ]).then(function(manager_id) {
      let query = 'SELECT employee.first_name, employee.last_name FROM employee WHERE ?'
      let params = [manager_id]
  
      db.query(query, params, (err, res) => {
          if (err) throw err;
          console.table(res);
          console.log(`Manager's employees shown successfully!`);
      })
      firstPrompt();
  })
}
// View Employees By Department
function viewEmployeesByDepartment() {
  inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "What is the department name?",
    }
  ]).then(function(department_name) {
      let query = 'SELECT employee.name FROM employee JOIN role ON role.id = employee.role_id JOIN department on department.id = role.department_id AND department.?'
      let params = [department_name]
  
      db.query(query, params, (err, res) => {
          if (err) throw err;
          console.log(`Manager's employee shown successfully!`);
      })
      firstPrompt();
  })
}

// Delete queries
const deleteEmployee = () => {
      inquirer.prompt([
          {
              name: 'id',
              type: 'input',
              message: 'Enter the Employee ID of the person you want to delete:'
          }
      ]).then(function(employee_id) {
          let query = `DELETE FROM employee where ?`
          let params = [employee_id]
          db.query(query, params, (err, res) => {
            if (err) throw err;
            console.log(`Employee deleted successfully!`);
        })
        firstPrompt();
      })
}

const deleteDepartment = () => {
  inquirer.prompt([
      {
          name: 'id',
          type: 'input',
          message: 'Enter the ID of the department you want to delete:'
      }
  ]).then(function(department_id) {
      let query = `DELETE FROM department where ?`
      let params = [department_id]
      db.query(query, params, (err, res) => {
        if (err) throw err;
        console.log(`Department deleted successfully!`);
    })
    firstPrompt();
  })
}

const deleteRole = () => {
  inquirer.prompt([
      {
          name: 'id',
          type: 'input',
          message: 'Enter the ID of the role you want to delete:'
      }
  ]).then(function(role_id) {
      let query = `DELETE FROM role where ?`
      let params = [role_id]
      db.query(query, params, (err, res) => {
        if (err) throw err;
        console.log(`Role deleted successfully!`);
    })
    firstPrompt();
  })
}     
//  case 'View the total utilized budget of a department':
function viewUtilizedBudgetByDepartment() {

  inquirer.prompt([
    {
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department you want to check the utilized budget:'
    }
]).then(function(department_name) {
    let query = `SELECT department.name AS department_name, sum(role.salary) AS utilized_budget FROM employee LEFT JOIN role ON role.id = employee.role_id JOIN department on department.id = role.department_id and department.? GROUP BY department.name`
    let params = [department_name]
    db.query(query, params, (err, res) => {
      if (err) throw err;
      console.table(res);
      console.log(`Utilized budget shown successfully!`);
  })
  firstPrompt();
})
}