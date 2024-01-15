const inquirer = require('inquirer');
const Table = require('cli-table');
const DB = require('./db.js');

// const database = new DB('localhost', 'root', 'employee_db');
// const db = database.connect();

class Hired {
    constructor() {
        this.database = new DB('localhost', 'root', 'employee_db');
        this.db = this.database.connect();
    }
    //viewAll empls
    viewAll() {
        this.db.query(`SELECT e.id as hired_id, e.first_name, e.last_name, p.title, d.name AS department, p.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM hired e
        INNER JOIN position p ON e.position_id = p.id
        INNER JOIN department d on p.department_id = d.id
        LEFT JOIN hired m ON e.manager_id = m.id
        ORDER BY e.id`, function (err, results) {
            if (err) {
                console.error('Error Fetch Employee Data:', err);
                return;
            }
            console.log('Employee Data:', results);
            //Table to hit all the criteria function
    const table = new Table({head:['Hired ID', 'First Name', 'Last Name', 'Job Title', 'Department Name', 'Salary', 'Manager']});

            if (results && results.length > 0) {
            results.forEach(value => {
            if (value.manager === null) {
                value.manager = 'null';
            }
                table.push([value.hired_id, value.first_name, value.last_name, value.title, value.department, value.salary, value.manager]);                
            });
            console.log('');
            console.log(table.toString());
            } else {
                console.log('No data found.');
            }
        });
        }
    
     //add - new position
    async add(positions, managers) {
        const question = [
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter the hired\'s first name.',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Please enter the hired\'s last name..',
            },
            {
                type: 'list',
                message: 'Please select a position.',
                name: 'position',
                choices: positions,
            },
            {
                type: 'list',
                message: 'Please select a manager.',
                name: 'manager',
                choices: managers,
            },
        ];

            try {
                const resp = await inquirer.prompt(question);
            
        // return await inquirer
        // .prompt(question)
        // .then((resp) => {
            //add new empl into db
            const results =  await new Promise((resolve, reject) => {

        this.db.query(
            `INSERT INTO hired (first_name, last_name, position_id, manager_id)
                VALUES (?,?,?,?);`,
            [resp.firstName, resp.lastName, resp.position, resp.manager],
            function (err, results) {
                if (err) {
                    console.error('Error adding hired:', err);
                    reject(err);
                } else {
                    console.log('Hired Added');            
                    resolve(results);
                }
            }
        );
    });
    console.log('Database Results:', results);
        } catch(err) {
            console.log(err);
            console.log('Sorry, there was an error.');
            }
    }
    //update the empl position
    async updatePosition(positions, hired) {
        //Q's
        const question = [
            {
                type: 'list',
                message: 'Please select an employee.',
                name: 'hired',
                choices: hired,
            },
            {
                type: 'list',
                message: 'Please select a new position.',
                name: 'position',
                choices: positions,
            },
        ];
        return await inquirer
        .prompt(question)
        .then((resp) => {
            //UPDATE Hire's new position in the database
            this.db.query(`UPDATE hired
                        SET position_id = ?
                        WHERE id = ?`, [resp.position, resp.hired], function (err, results) {
                console.log('Hired Position Updated');            
                });
        })
        //Catch any errors
        .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
            });
    }
}

module.exports = Hired;