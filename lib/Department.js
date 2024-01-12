const inquirer = require('inquirer');
const MainMenu = require('./MainMenu.js');
const Table = require('cli-table');
//Get the DB Connection
const DB = require('./db');
const database = new DB('localhost', 'root', '', 'employee_db');
const db = database.connect();

class Department {
    constructor() {}
    //Method to pull all departments
    viewAll() {        
        db.query('SELECT id, name FROM department ORDER BY id', function (err, results) {
            //Create the table output from the cli-table library
            const table = new Table({head:['Department Name', 'Department ID']});
            results.forEach(value => {
                table.push([value.name, value.id]);                
            });
            console.log('');
            console.log(table.toString());        
          });
    }
    //Method to add a new department
    add() {
        //Inquirer question setup
        const question = [
            {
                type: 'input',
                name: 'deptName',
                message: 'Please enter the department name you wish to add.',
            }
        ]
        return inquirer
        .prompt(question)
        .then((resp) => {
            //INSERT the new department to the database
            db.query(`INSERT INTO department (name)
                        VALUES (?);`, resp.deptName, function (err, results) {
                console.log('Department Added');            
              });
        })
        //Catch any errors
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
          });
    }
}

module.exports = Department;