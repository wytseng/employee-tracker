const inquirer = require('inquirer');
const db = require('./db');

init();

function init() {
  console.log("Welcome to the employee tracker.")

  // calls on the prompt;
  actionPrompt();
}

function actionPrompt() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          // "View All Employees By Department",
          // "View All Employees By Manager",
          "Add An Employee",
          // "Remove Employee",
          "Update An Employee Role",
          // "Update Employee Manager",
          "View All Roles",
          "Add A Role",
          // "Remove A Role",
          "View All Departments",
          "Add A Department",
          // "Remove A Department",
          // "View Total Utilized Budget By Department",
          "Quit"
        ]
      }
    ])
      .then((response) => {
        switch (response.action) {
          case "View All Employees":
            viewAll();
            break;
          // case "View All Employees By Department":
          //   viewAllByDept();
          //   break;
          // case "View All Employees By Managers":
          //   viewAllByManager();
          //   break;
          case "Add An Employee":
            addEmployee();
            break;
          // case "Remove Employee":
          //   deleteEmployee();
          //   break;
          case "Update An Employee Role":
            updateEmployeeRole();
            break;
          // case "Update Employee Manager":
          //   updateEmployeeManager();
          //   break;
          case "View All Roles":
            viewAllRoles();
            break;
          case "Add A Role":
            addRole();
            break;
          // case "Remove A Role":
          //   removeRole();
          //   break;
          case "View All Departments":
            viewAllByDept();
            break;
          case "Add A Department":
            addDept();
            break;
          // case "Remove Department":
          //   removeDept();
          //   break;
          // case "View Total Utilized Budget By Department":
          //   viewTotalBudget();
          //   break;
          case "Quit":
            break;
        }
      })
}

function viewAll() {
  console.log("view all employee");
  db.findAll();
  // actual action should get data from query db 
  actionPrompt();
}

function addEmployee() {
  console.log("add an employee");
  actionPrompt();
}

function updateEmployeeRole() {
  console.log('updating employee role');
  actionPrompt();
}

function viewAllRoles() {
  console.log('view all roles');
  actionPrompt();
}

function addRole() {
  console.log('add a role');
  actionPrompt();
}

function viewAllByDept() {
  // inquirer 
  //   .prompt([
  //     {
  //       type: 'list',
  //       name: 'department',
  //       message: 'Which department would you like to see employees for?',
  //       choices: [
  //         // get from query db 
  //         'Finance', 'Marketing'
  //       ]
  //     }
  //   ])
  console.log('View all departments')
  actionPrompt();
}

function addDept() {
  console.log('add a ddepartment');
  actionPrompt();
}
