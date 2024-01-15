//Add required libraries and classes
const inquirer = require('inquirer');
const Table = require('cli-table');
//Get the DB Connection
const DB = require('./db.js');
const database = new DB('localhost', 'root', 'employee_db');
const db = database.connect();

// db.query('SELECT * FROM position')

class Position{
    constructor() {}
    //We need a way to pull all of the positions.
    viewAll() {        
        db.query(`SELECT p.id, title, salary, name
                    FROM \`position\` p
                    JOIN department d on d.id = p.department_id
                    ORDER BY p.id
                    `, function (err, results) {
                        if (err) {
                        console.error('Error fetching positions:', err);
                        return;
                        }
            //Create the table output from the cli-table library
            const table = new Table({head:['Position ID', 'Job Title', 'Department Name', 'Salary']});
            results.forEach(value => {
                table.push([value.id, value.title, value.name, value.salary]);                
            });
            console.log('');
            console.log(table.toString());  
          });
    }
    //Adding a Position
    async add(choices) {  
        //Inquirer question setup    
        const question = [
            {
                type: 'input',
                name: 'positionName',
                message: 'Please enter the Position name you wish to add.',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter salary.',
            },
            {
                type: 'list',
                message: 'Please select department.',
                name: 'deptId',
                choices: choices
            },
        ]
        return await inquirer
        .prompt(question)
        .then((resp) => {
            //INSERT the new Position to the database
            db.query(`INSERT INTO \`position\` (title, salary, department_id)
                        VALUES (?,?,?);`, [resp.positionName, resp.salary, resp.deptId], function (err, results) {
                    if (err) {
                        console.error('Error adding position:', err);
                        return;
                    }
                            console.log('Position Added');            
                });
        })
        //Catch any errors
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
            });
    }
}

module.exports = Position;
