const { prompt } = require('inquirer');
const { deptChoices, rolesChoices } = require('./db');
const db = require('./db');

init();

function init() {
  console.log("Welcome to the employee tracker.")

  // calls on the prompt;
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
        // "View All Employees By Department",
        // "View All Employees By Manager",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
        // "Update Employee Manager",
        // "Remove A Department",
        // "Remove Employee",
        // "Remove A Role",
        // "View Total Utilized Budget By Department",
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
        // case "View All Employees By Department":
        //   viewAllByDept();
        //   break;
        // case "View All Employees By Managers":
        //   viewAllByManager();
        //   break;
        case "Add A Department":
          addDept();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Update An Employee Role":
          updateEmployeeRole();
          break;
        // case "Update Employee Manager":
        //   updateEmployeeManager();
        //   break;
        // case "Remove Department":
        //   removeDept();
        //   break;
        // case "Remove A Role":
        //   removeRole();
        //   break;
        // case "Remove Employee":
        //   deleteEmployee();
        //   break;
        // case "View Total Utilized Budget By Department":
        //   viewTotalBudget();
        //   break;
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


// Adds a department to the DB
function addDept() {
  inquirer.prompt([
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
          db.updateEmployeeRole(employeeId, response)
          .then(() => actionPrompt())
        })
      }) 
    })
  })
}

// Quit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}