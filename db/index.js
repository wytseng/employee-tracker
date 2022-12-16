const mysql = require('mysql2');
const connection = require('../config');
const cTable = require('console.table');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAll() {
    this.connection.promise().query(
      `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees 
      LEFT JOIN roles ON employees.role_id = roles.id
      LEFT JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id;`)
      .then(([rows]) => {
        console.log('\n');
        console.table(rows)
      })
      .catch(err => console.error(err));
  }
}

module.exports = new DB(connection)
