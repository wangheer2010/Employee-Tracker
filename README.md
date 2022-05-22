# SQL Employee Tracker (Content Management System)
  ## License
  []()
  
  ## Table of Contents
  - [Description](#description)
  - [Database](#database)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  - [Video](#video)

  ## Description
  This is an Employee Tracker App that helps the business owners view and manager the departments, roles and employees in their companies and better organize and plan their businesses

  ## Database
  We have 3 tables in the database: Department, Role, and Employee
  - Department has 2 columns: id and name
  - Role has 4 columns: id, title, salary, department_id
  - Employee has 5 columns: id, first_name, last_name, role_id, manager_id
  
  ## Usage
  As the developer of this app, all user information will not be collected. Viewing the walkthrough video is highly recommended before you try to install this package. It shows you all you need to set this up!
  In order to use this app. You need to take the following steps:
  - Clone the repo
  - Open a terminal & run `npm install` to install node modules
  - Run `mysql -u root -p` 
  - Enter your MySQL password
  - run `source db/schema.sql;` to create the schema from MySQL shell
  - run `source db/seed.sql` to seed the database
  - run `exit` to quit the DBMS
  - run `node server.js` to start server
  
  ## Contributing
  I welcome all developers that are interested in this project to add more fancy features to the app! Feel free to contact me and welcome to follow me.

  ## Tests
  Our tests are performed using the Insomnia application
  ## Questions
  - [My git Repo](https://github.com/wangheer2010)
  - [Contact Me](mailto:cw3211@columbia.edu)
  ## Video
  - [My Video Instruction](https://www.bilibili.com/video/)