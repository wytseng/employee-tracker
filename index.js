const { prompt } = require('inquirer');
const db = require('./db');
const cTable = require('console.table');
const logo = require('asciiart-logo');
const config = require('./package.json');

init();

function init() {
  console.log(logo({
    name: "Employee Tracker",
    font: "Broadway KB",
    lineChars: 7,
    padding: 2,
    margin: 2,
    borderColor: 'bold-green',
    logoColor: 'grey',
  })
  .emptyLine()
  .center("Welcome to the employee tracker.")
  .render());

  actionPrompt();
}

function actionPrompt() {
  prompt([
    {
      type: 'list',
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee's Role",
        "Update An Employee's Manager",
        "Remove A Department",
        "Remove A Role",
        "Remove A Employee",
        "View Total Utilized Budget By Department",
        "Quit"
      ]
    }
  ])
    .then((response) => {
      switch (response.action) {
        case "View All Departments":
          viewAllDept();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAll();
          break;
        case "View All Employees By Department":
          viewAllByDept();
          break;
        case "View All Employees By Manager":
          viewAllByManager();
          break;
        case "Add A Department":
          addDept();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Update An Employee's Role":
          updateEmployeeRole();
          break;
        case "Update An Employee's Manager":
          updateEmployeeManager();
          break;
        case "Remove A Department":
          removeDept();
          break;
        case "Remove A Role":
          removeRole();
          break;
        case "Remove A Employee":
          removeEmployee();
          break;
        case "View Total Utilized Budget By Department":
          viewTotalBudget();
          break;
        case "Quit":
          quit();
          break;
      }
    })
}

// Displays a table of all departments in the DB
function viewAllDept() {
  db.findAllDept()
  .then(([rows]) => {
    console.log(`\n`);
    console.table(rows); 
  })
  .then(() => actionPrompt());
}

// Returns a table of all roles in the DB
function viewAllRoles() {
  db.findAllRoles()
  .then(([rows]) => {
    console.log(`\n`);
    console.table(rows);
  })
  .then(() => actionPrompt());
}

// Returns a table of all Employees in the DB with information on their role and direst manager.
function viewAll() {
  db.findAll()
  .then(([rows]) => {
    console.log('\n');
    console.table(rows) })
  .then(() => actionPrompt());
}

function viewAllByDept() {
  db.findAllDept()
  .then(([rows]) => {
    const departmentChoices = rows.map(({ id, name }) => ({
      name: name, 
      value: id
    }));
    
    prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: "Which department would you like to see employees for?",
        choices: departmentChoices
      }
    ])
    .then(response => {
      db.findEmployeesByDept(response.departmentId)
      .then(([rows]) => {
        rows.length === 0 ? console.log('The selected department does not have employees.') : console.table(rows);
      })
      .then(() => actionPrompt())
    })
  })
}

function viewAllByManager() {
  db.findAll()
  .then(([rows]) => {
    const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    prompt([
      {
        type: 'list',
        name: 'managerId',
        message: 'Which employee do you want to see direct reports for?',
        choices: employeeChoices
      }
    ])
    .then(response => {
      db.findEmployeesByManager(response.managerId)
      .then(([rows]) => {
        rows.length === 0 ? console.log('The selected employee does not have direct reports.') : console.table(rows)
      })
      .then(() => actionPrompt())
    })
  })
}

// Adds a department to the DB
function addDept() {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?'
    }
  ])
  .then(response => {
    db.addDept(response)
    .then(() => actionPrompt());
  })
}

// Adds a new role to the DB
function addRole() {
  db.findAllDept()
  .then(([rows]) => {
    const departmentChoices = rows.map(({ id, name }) => ({
      name: name, 
      value: id
    }));
    prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Which department does the role belong to?',
        choices: departmentChoices
      }
    ])
      .then(response => {
        db.addRole(response)
        .then(() => actionPrompt());
      })
  })
}

function addEmployee() {
  prompt([
    {
      type:'input',
      name: 'first_name',
      message: "What is the employee's first name?"
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is the employee's last name?"
    }
  ])
  .then(resopnse => {
    let firstName = resopnse.first_name;
    let lastName = resopnse.last_name;
    
    db.findAllRoles()
    .then(([rows]) => {
      const rolesChoices = rows.map(({ id, title }) => ({
        name: title, 
        value: id
      }));
      
      prompt([
        {
          type:'list',
          name: 'role_id',
          message: "What is the employee's role?",
          choices: rolesChoices
        }
      ])
      .then(response => {
        let roleId = response.role_id;

        db.findAll()
        .then(([rows]) => {
          const managerChoices = rows.map(({ id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
          }));

          managerChoices.unshift({ name: "None", value: null });

          prompt([
            {
              type: 'list',
              name: 'manager_id',
              message: "Who is the employee's direct manager?",
              choices: managerChoices
            }
          ])
          .then(response => {
            const newEmployee = {
              first_name: firstName,
              last_name: lastName,
              role_id: roleId,
              manager_id: response.manager_id
            }
            db.addEmployee(newEmployee)
            .then(() => actionPrompt())
          })
        })
      })
    })
  })
}

// Updates an employee's role
function updateEmployeeRole() {
  db.findAll()
  .then(([rows]) => {
    const employeeChoice = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Which employee's role do you want to update?",
        choices: employeeChoice
      }
    ])
    .then(response => {
      let employeeId = response.employeeId;

      db.findAllRoles()
      .then(([rows]) => {
        const rolesChoices = rows.map(({ id, title }) => ({
          name: title, 
          value: id
        }));

        prompt([
          {
            type: 'list',
            name: 'role_id',
            message: "Which role do you wnat to assing the selected employee?",
            choices: rolesChoices
          }
        ])
        .then(response => {
          db.updateEmployee("role", employeeId, response)
          .then(() => actionPrompt())
        })
      }) 
    })
  })
}

// Updates an employee's manager
function updateEmployeeManager() {
  db.findAll()
  .then(([rows]) => {
    const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices
      }
    ])
    .then(response => {
      let employeeId = response.employeeId;

      db.findAllManagers(employeeId)
      .then(([rows]) => {
        const managerChoices = rows.map(({ id, first_name, last_name}) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));

        managerChoices.unshift({ name: "None", value: null });

        prompt([
          {
            type: 'list',
            name: 'manager_id',
            message: "Which employee do you want to set as manager for the selected employee?",
            choices: managerChoices
          }
        ])
        .then(response => {
          db.updateEmployee("manager", employeeId, response)
          .then(() => actionPrompt())
          })
      }) 
    })
  })
}

function removeDept() {
  db.findAllDept()
  .then(([rows]) => {
    const departmentChoices = rows.map(({ id, name }) => ({
      name: name, 
      value: id
    }));

    prompt([
      {
        type: 'list',
        name: 'id',
        message: "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
        choices: departmentChoices
      }
    ])
    .then(response => {
      db.deleteDept(response)
      .then(() => {
        console.log('Removed department from database.');
        actionPrompt();
      })
    })
  })
}

function removeRole() {
  db.findAllRoles()
  .then(([rows]) => {
    const rolesChoices = rows.map(({ id, title }) => ({
      name: title, 
      value: id
    }));

    prompt([
      {
        type: 'list',
        name: 'id',
        message: "Which role do you want to remove? (Warning: This will also remove employees)",
        choices: rolesChoices 
      }
    ])
    .then(response => {
      db.deleteRole(response)
      .then(() => {
        console.log('Removed role from database.');
        actionPrompt();
      })
    })
  })
}

function removeEmployee() {
  db.findAll()
  .then(([rows]) => {
    const employeeChoices = rows.map(({ id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    prompt([
      {
        type: 'list',
        name: 'id',
        message: "Which employee do you want to remove?",
        choices: employeeChoices
      }
    ])
    .then(response => {
      db.deleteEmployee(response)
      .then(() => {
        console.log("Removed employee from the database.");
        actionPrompt();
      })
    })
  })
}

// Display the total budget for each department
function viewTotalBudget() {
  db.getDeptBudget()
  .then(([rows]) => {
    console.log(`\n`);
    console.table(rows);
  })
  .then(() => actionPrompt())
}

// Quit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}