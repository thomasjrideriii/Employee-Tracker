const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password123",
  database: "employee_tracker_db",
});

// Initialize connection to the database

connection.connect(function (err) {
  if (err) throw err;
  initialize();
});
initialize = function () {
  // Ask the user for a task
  inquirer
    .prompt([
      {
        name: "task",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employee Data",
          "Add an Employee",
          "Update Employee Roles",
          "View All Roles",
          "Add a Role",
          "View All Departments",
          "Add a Department",
          "EXIT",
        ],
      },
    ])
    .then((result) => {
      // Run a funtion based on the user's input
      switch (result.task) {
        case "View All Employee Data":
          viewEmployees();
          break;
        // case "Add an Employee":
        //   addEmployee();
        //   break;
        // case "Update Employee Roles":
        //   updateEmployeeRole();
        //   break;
        // case "View All Roles":
        //   viewRoles();
        //   break;
        // case "Add a Role":
        //   addRole();
        //   break;
        // case "View All Departments":
        //   viewDepartments();
        //   break;
        // case "Add a Department":
        //   addDepartment();
        //   break;
        case "Exit":
          connection.end();
          break;
      }
    });
};

viewEmployees = function () {
  connection.query(
    `SELECT first_name,last_name,title,salary
        FROM employee
        RIGHT JOIN role ON employee.role_id = role.id
        RIGHT JOIN department ON role.department_id = department.id
        `,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      initialize();
    }
  );
};

addEmployee = function () {};

updateEmployeeRole = function () {};

viewRole = function () {};

addRole = function () {};

viewDepartments = function () {};

addDepartment = function () {};
