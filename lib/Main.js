//libraries and classes
const inquirer = require('inquirer');
const Department = require('./Department');
const Position = require('./Position');
const Hired = require('./Hired');
//DB Connection
const DB = require('./db');
const database = new DB('localhost', 'root', 'employee_db');
const db = database.connect();
class Main {

    constructor() {}
    //Method to display the Home menu.
    async show() {
        //inquirer question's menu
        const question = [
            {
                type: 'list',
                message: 'What Do You Want To Do?',
                name: 'option',
                choices: [
                    {name:'View All Departments',value:"viewDep"},
                    {name:'View All Positions', value:'viewPositions'},
                    {name:'View All Hired', value:'viewHired'},
                    {name:'Add a Department', value:'addDep'},
                    {name:'Add a Position', value:'addPosition'},
                    {name:'Add a Hired', value:'addHired'},
                    {name:'Update a Hired Position',value:"updateHiredPosition"},
                    {name:'Quit', value:'quit'}
                ]
            },
        ];
        //Create the objects
        const department = new Department;
        const position = new Position;
        const hired = new Hired;
        return inquirer
        .prompt(question)
        .then(async (resp) =>{

        // try {
        //     const resp = await inquirer.prompt(question);
        
        // return inquirerPromise.then(async (inquirer) => {
        //     await inquirer.prompt(question)
        //     .then(async (resp) =>{  
            //Selector needs to view the options     
            if(resp.option === 'viewDep') {
                //viewAll to see the departments
                department.viewAll();
                this.waitShow();
            }
            if(resp.option === 'viewPositions') {
                // viewAll to get the positions 
                position.viewAll();
                this.waitShow();
            }
            if(resp.option === 'viewHired') {
                //viewAll for employees
                hired.viewAll();
                this.waitShow();
            }
            if(resp.option === 'addDep') {
                //add method to add a department
                await department.add();
                this.waitShow();
            }  
            if(resp.option === 'addPosition') {
                //Query the DB to get the department list for selection
            db.promise().query("SELECT id as value, name as name FROM department")
                .then( async ([rows,fields]) => {
                //     //Call the add method to add the new position passing the department list
                    await position.add(rows);
                // })
                    this.waitShow(); 
                    return true;  
                })
                .then((resp)=>{
                this.waitShow(); 
                })
                // Catch any errors
                .catch((err) => {
                    console.log(err);
                    console.log('Sorry, there was an error.');
                });
            }
            
            if(resp.option === 'addHired') {
                //Query the DB to get the position list for selection
                db.promise().query("SELECT id as value, title as name FROM position")
                .then( async ([positions,fields]) => {
                    //Query the DB to get the manager list for selection
                db.promise().query('SELECT id as value, concat(first_name, \' \', last_name) as name FROM hired')
                    .then(async ([managers,fields]) => {
                        //Call the add method to add the new employee passing the position and manager lists
                await hired.add(positions, managers);
                    })
                    .then((resp)=>{
                this.waitShow();                  
                    });
                })
                    // Catch any errors
                .catch ((err) => {
                        console.log(err);
                        console.log('Sorry, there was an error.');
                    });
                }
                //Catch any errors
            //     .catch((err) => {
            //         console.log(err);
            //         console.log('Sorry, there was an error.');
            //     });
            // }
            if(resp.option === 'updateHiredPosition') {
                //Query the DB to get the position list for selection
            db.promise().query("SELECT id as value, title as name FROM position")
                .then( async ([positions,fields]) => {
                db.promise().query('SELECT id as value, concat(first_name, \' \', last_name) as name FROM hired')
                //     //Query the DB to get the employee list for selection
                //     db.promise().query('SELECT id as value, concat(first_name, \' \', last_name) as name FROM hired')
                    .then(async ([hired,fields]) => {
                        //Call the updatePosition method to update the position passing the position and employee lists
                        await hired.updatePosition(positions, hired);
                    })
                    .then((resp)=>{
                        this.waitShow();                  
                    })
                //     //Catch any errors
                    .catch((err) => {
                        console.log(err);
                        console.log('Sorry, there was an error.');
                    });                    
                })
                // //Catch any errors
                .catch((err) => {
                    console.log(err);
                    console.log('Sorry, there was an error.');
                });
    }
            
            //Quit the application logic
            if(resp.option === 'quit') {
                console.log('Thanks for Using The Employee Tracker');
                process.exit();  
            }
        })
        
        //Catch any errors                      
    .catch((err) => {
            console.log(err);
            console.log('Sorry, there was an error.');
        });
    }

    //Method to wait to show the menu to allow the tables to be shown.
    waitShow() {
            setTimeout(() => {
                this.show();  
            }, 1000);      
    }
}
module.exports = Main;

