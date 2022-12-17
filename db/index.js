const mysql = require('mysql2');
const connection = require('../config');
const cTable = require('console.table');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAll() {
    return (
      this.connection.promise().query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS manager ON employees.manager_id = manager.id;`));
  }

  findAllManagers(employeeId) {
    return (
      this.connection.promise().query(
        `SELECT id, first_name, last_name FROM employees WHERE employees.id != ?`, employeeId));
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

  findEmployeesByDept(deptId) {
    return (
      this.connection.promise().query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id
        WHERE roles.department_id = ?`, deptId));
  }

  findEmployeesByManager(managerId) {
    return (
      this.connection.promise().query(
        `SELECT employees.id, employees.first_name, employees.last_name, departments.name AS department, roles.title FROM employees 
        LEFT JOIN roles ON employees.role_id = roles.id
        LEFT JOIN departments ON roles.department_id = departments.id
        WHERE employees.manager_id = ?`, managerId));
  }

  // getDeptBudget(){
  //   return(
  //     this.connection.promise().query(
  //       ''
  //     )
  //   )
  // }

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

  updateEmployee(attr, employeeId, data) {
    const updateArr = [data,
      { id: employeeId }
    ]
    return (
      this.connection.promise().query( 
        `UPDATE employees SET ? WHERE ?`, updateArr)
        .then(console.log(`\nUpdated employee's ${attr}.`)));
  }

  deleteDept(data) {
    return this.connection.promise().query(`DELETE FROM departments WHERE ?`, data );
  }

  deleteRole(data) {
    return this.connection.promise().query(`DELETE FROM roles WHERE ? `, data);
  }

  deleteEmployee(data) {
    return this.connection.promise().query(`DELETE FROM employees WHERE ?`, data);
  }
}

module.exports = new DB(connection)
