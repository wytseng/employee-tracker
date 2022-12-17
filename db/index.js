const mysql = require('mysql2');
const connection = require('../config');
const cTable = require('console.table');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  rolesChoices() {
    this.findAllRoles()
    .then(([rows]) => {
      const rolesChoices = rows.map(({ id, title }) => ({
        name: title, 
        value: id
      }));
      console.log(rolesChoices)
      return rolesChoices
    })
  }

  findAll() {
    return (
      this.connection.promise().query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS manager ON employees.manager_id = manager.id;`));
  }

  findAllRoles() {
    return (
      this.connection.promise().query(
        `SELECT roles.id, roles.title, departments.name AS department, roles.salary FROM roles
        LEFT JOIN departments ON roles.department_id = departments.id;`));
  }

  findAllDept() {
    return this.connection.promise().query(`SELECT * FROM departments`);
  }

  addEmployee(data) {
    return (
      this.connection.promise().query(
        `INSERT INTO employees SET ?`, data) 
        .then(console.log(`\nAdded ${data.first_name} ${data.last_name} to the database.`))
    );
  }

  addRole(data) {
    return (
      this.connection.promise().query(
        `INSERT INTO roles SET ?`, data)
        .then(console.log(`\nAdded ${data.title} role to the database.`))
    );
  }

  addDept(data) {
    return (
      this.connection.promise().query(
        `INSERT INTO departments SET ?`, data)
        .then(console.log(`\nAdded ${data.name} department to the database.`))
    );
  }
}

module.exports = new DB(connection)
