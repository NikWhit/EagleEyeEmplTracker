const inquirer = require('inquirer');
const Table = require('cli-table');
const DB = require('./db');
const database = new DB('localhost', 'root', '', 'employee_db');
const db = database.connect();

class Employee {
    constructor() {}
    //viewAll empls
    viewAll() {
        db.query(`SELECT e.id as employee_id, first_name, last_name, title, name, manager, salary
        FROM employee e
        INNER JOIN position r on e.position_id = r.id
        INNER JOIN department d on r.department_id = d.id
        LEFT JOIN (select id, concat(first_name, ' ', last_name) as manager FROM employee) m on e.manager_id = m.id
        ORDER BY e.id`, function (err, results) {
            //Table to hit all the criteria function
            const table = new Table({head:['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department Name', 'Salary', 'Manager']});
            results.forEach(value => {
                if (value.manager === null) {
                    value.manager = 'null';
                }
                table.push([value.employee_id, value.first_name, value.last_name, value.title, value.name, value.salary, value.manager]);                
            });
            console.log('');
            console.log(table.toString());
          });
    }
     //add - new position
    async add(positions, managers) {
        const question = [
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter the employee\'s first name.',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Please enter  the employee\'s last name..',
            },
            {
                type: 'list',
                message: 'Please select a position.',
                name: 'position',
                choices: positions
            },
            {
                type: 'list',
                message: 'Please select a manager.',
                name: 'manager',
                choices: managers
            }
        ]
        return await inquirer
        .prompt(question)
        .then((resp) => {
            //add new empl into db
            db.query(`INSERT INTO employee (first_name, last_name, position_id, manager_id)
                        VALUES (?,?,?,?);`, [resp.firstName, resp.lastName, resp.posiion, resp.manager], function (err, results) {
                console.log('Employee Added');            
                });
        })
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
            });
    }
    //update the emplposition
    async updatePosition(positions, employees) {
        //Q's
        const question = [
            {
                type: 'list',
                message: 'Please select an employee.',
                name: 'employee',
                choices: employees
            },
            {
                type: 'list',
                message: 'Please select a new position.',
                name: 'position',
                choices: positions
            }
        ]
        return await inquirer
        .prompt(question)
        .then((resp) => {
            //UPDATE the employee's position in the database
            db.query(`UPDATE employee
                        SET position_id = ?
                        WHERE id = ?`, [resp.position, resp.employee], function (err, results) {
                console.log('Employee Position Updated');            
                });
        })
        //Catch any errors
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
            });
    }
}

module.exports = Employee;