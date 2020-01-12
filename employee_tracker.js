const mysql = require('mysql');
const inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Themingway83',
    database: 'employee_trackerDB'
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

const start = function () {
    inquirer
        .prompt({
            name: 'likeToDo',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'Update Employee Manager',
                'Delete Employee',
                'Exit'
            ]
        }).then(function (answer) {
            switch (answer.likeToDo) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;

                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;

                case 'Delete Employee':
                    deleteEmployee();
                    break;

                case 'Exit':
                    exit();
            }
        });
}

//View all employees
function viewAllEmployees() {
    if (err) throw err;
    let query = '.....'
}

//Adding a new employee
function addEmployee() {

    let join = 'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee RIGHT JOIN role ON employee.role_id = role.id';

    connection.query(join, function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the employee first name?',
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the employee last name?'
                },
                {
                    name: 'role',
                    type: 'list',
                    message: `What is the employee's role?`,
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].title);
                        }
                        return choiceArray;
                    }
                },
                {
                    name: 'manager',
                    type: 'list',
                    message: `Who is the employee's manager?`,
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function (answer) {
                connnection.query('')
            });
    });
}

//Adding a department...
function addDepartment() {
    inquirer.prompt({
        name: 'department',
        type: 'input',
        message: 'What department would you like to add?'
    })
        .then(function (answer) {
            connection.query('INSERT INTO department SET ?', { name: answer.department }, function (err) {
                if (err) throw err;
                console.log(`${answer.department} department was successfully updated. \n`);
                start();
            });
        });
}

//Adding a new role...
function addRole() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'input',
                    message: 'What role would you like to add?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What salary does this role make?'
                },
                {
                    name: 'roleDep',
                    type: 'list',
                    message: 'What department does this role fall under?',
                    choices: function () {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].name);
                        }
                        return choiceArray;
                    }
                }
            ])
            .then(function (answer) {

            });
    });
}


//Update employee role...


//Update employee manager...


//Delete employee
function deleteEmployee() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        inquirer.prompt({
            name: 'employee',
            type: 'list',
            message: 'What employee would you like to delete?',
            choices: function () {
                let choiceArray = [];
                for (let i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].last_name);
                }
                return choiceArray;
            }
        })
            .then(function (answer) {
                connection.query('DELETE FROM employee WHERE ?', { last_name: answer.employee }, function (err) {
                    if (err) throw err;
                    console.log(`${answer.employee} was successfully deleted. \n`);
                    start();
                });
            });
    });
}

//Exit
function exit() {
    connection.end();
}