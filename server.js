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
        case "Add an Employee":
          addEmployee();
          break;
        case "Update Employee Roles":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add a Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "EXIT":
          connection.end();
          break;
      }
    });
};

viewEmployees = function () {
  connection.query(
    `SELECT first_name,last_name,title,salary,first_name,last_name
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

addEmployee = function () {
  // Create role array for inquirer
  let roleList = [];
  connection.query(`SELECT title FROM role`, function (err, res) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      roleList.push(res[i].title);
    }
  });
  // Create employee array for inquirer
  let bossList = [];
  connection.query(`SELECT first_name, last_name FROM employee`, function (
    err,
    res
  ) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      bossList.push(res[i].first_name + " " + res[i].last_name);
    }
    bossList.push("N/A");
  });
  // Ask user for new employee first name, last name, and role
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "text",
        message: "What is this employee's first name?",
      },
      {
        name: "last_name",
        type: "text",
        message: "What is this employee's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is this employee's role?",
        choices: roleList,
      },
      {
        name: "manager",
        type: "list",
        message: "Who is this employee's manager?",
        choices: bossList,
      },
    ])
    .then(function (result) {
      // split result.manager into first and last name
      let managerArr = result.manager.split(" ");
      let managerFirstName = managerArr[0];
      let managerLastName = managerArr[1];
      connection.query(
        //   Searching for the role id.
        `SELECT id FROM role WHERE ?`,
        {
          title: result.role,
        },
        function (err, res) {
          if (err) throw err;
          //   Set the department ID in empty variable.
          roleID = res[0].id;
          // Search for the manager employee id.
          connection.query(
            `SELECT id FROM employee WHERE first_name = "${managerFirstName}" AND last_name = "${managerLastName}"`,
            function (err, output) {
              if (err) throw err;
              managerID = output[0].id;
              //   Output full new employee to the database
              connection.query(
                `INSERT INTO employee SET ?`,
                {
                  first_name: result.first_name,
                  last_name: result.last_name,
                  role_id: roleID,
                  manager_id: managerID,
                },
                function (err, res) {
                  if (err) throw err;
                  console.log(
                    result.first_name + " " + result.last_name + " added!"
                  );
                  //   Restart program
                  initialize();
                }
              );
            }
          );
        }
      );
    });
};

updateEmployeeRole = function () {
  // Create employee array for inquirer
  let employeeList = [];
  connection.query(`SELECT first_name, last_name FROM employee`, function (
    err,
    res
  ) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      employeeList.push(res[i].first_name + " " + res[i].last_name);
    }
    //   Create role array for inquirer
    let roleList = [];
    connection.query(`SELECT title FROM role`, function (err, res) {
      if (err) throw err;
      for (i = 0; i < res.length; i++) {
        roleList.push(res[i].title);
      }
      //   Prompt user on the employee and the requested change.
      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeList,
          },
          {
            name: "role",
            type: "list",
            message: "What would you like to change their role to?",
            choices: roleList,
          },
        ])
        .then(function (result) {
          // Parse employee name
          let nameArr = result.employee.split(" ");
          let employeeFirstName = nameArr[0];
          let employeeLastName = nameArr[1];

          // Find role id
          connection.query(
            `SELECT id FROM role WHERE title = "${result.role}"`,
            function (err, res) {
              if (err) throw err;
              let roleID = res[0].id;
              connection.query(
                `Update employee SET role_id = "${roleID}" WHERE first_name = "${employeeFirstName}" AND last_name = "${employeeLastName}"`,
                function (err, output) {
                  if (err) throw err;
                  console.log(result.employee + " updated!");
                  initialize();
                }
              );
            }
          );
        });
    });
  });
};

viewRoles = function () {
  connection.query(
    `SELECT title, salary, name 
        FROM role
        LEFT JOIN department ON role.department_id = department.id`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
      initialize();
    }
  );
};

// Function for adding new Role to Database
addRole = function () {
  // Creating department array for inquirer
  let departmentList = [];
  connection.query(`SELECT name FROM department`, function (err, res) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      departmentList.push(res[i].name);
    }
  });
  // Ask user for the name of the new role, its salary, and its department
  inquirer
    .prompt([
      {
        name: "title",
        type: "text",
        message: "What is the name of this position?",
      },
      {
        name: "salary",
        type: "number",
        message: "How much does this position earn per year?",
      },
      {
        name: "department",
        type: "list",
        message: "What department does this position belong to?",
        choices: departmentList,
      },
    ])
    .then(function (result) {
      // Empty variable for department id.
      let departmentID = 0;

      connection.query(
        //   Searching for the department id.
        `SELECT id FROM department WHERE ?`,
        {
          name: result.department,
        },
        function (err, res) {
          if (err) throw err;
          //   Set the department ID in empty variable.
          departmentID = res[0].id;

          //   Output full new role to the database
          connection.query(
            `INSERT INTO role SET ?`,
            {
              title: result.title,
              salary: result.salary,
              department_id: departmentID,
            },
            function (err, res) {
              if (err) throw err;
              console.log(result.title + " role added!");
              //   Restart program
              initialize();
            }
          );
        }
      );
    });
};

// Function for displaying all stored Departments
viewDepartments = function () {
  connection.query(`SELECT * FROM department`, function (err, res) {
    if (err) throw err;
    console.table(res);
    initialize();
  });
};

// Function for adding departments to Database
addDepartment = function () {
  inquirer
    .prompt([
      {
        name: "department",
        type: "text",
        message: "What is the name of this department?",
      },
    ])
    .then((result) => {
      connection.query(
        `INSERT INTO department SET ?`,
        {
          name: result.department,
        },
        function (err, res) {
          if (err) throw err;
          console.log(result.department + " department added!");
          initialize();
        }
      );
    });
};
