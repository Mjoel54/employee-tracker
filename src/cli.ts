//TODO: Include packages needed for this application
import inquirer from "inquirer";
import dotenv from "dotenv";
import { pool, connectToDb } from "./connection.js";
import chalk from 'chalk';
dotenv.config();

await connectToDb();

const title: string = `EMPLOYEE TRACKER`;

//TODO: Create an array of options for the user to select from
const applicationOptions: any =  {
  type: "list",
  name: "options",
  message: "What would you like to do?",
  choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit"
  ]
};

//

function viewAllDepartments() {
    pool.query("SELECT * FROM departments", (error, result) => {
        if (error) {
            console.error("Error viewing all departments: ", error);
            return;
        }
        console.table(result.rows);
        init();
    })
};

function viewAllRoles() {
  pool.query(
    `SELECT roles.id, roles.title, roles.salary, departments.name as department_name 
     FROM roles 
     JOIN departments ON roles.department_id = departments.id`,
    (error, result) => {
      if (error) {
        console.error("Error viewing all roles: ", error);
        return;
      }
      console.table(result.rows);
      init();
    }
  );
}

function viewAllEmployees() {
  pool.query(
    `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS job_title, departments.name AS department, roles.salary, employees.manager_name
    FROM employees 
    LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN departments ON roles.department_id = departments.id`,
    (error, result) => {
      if (error) {
        console.error("Error viewing all employees: ", error);
        return;
      }
      console.table(result.rows, ["id", "first_name", "last_name", "job_title", "department", "salary", "manager_name"]);
      init();
    }
  );
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the new department:",
      },
    ])
    .then((answers) => {
      const { departmentName } = answers;
      pool.query(
        "INSERT INTO departments (name) VALUES ($1) RETURNING *",
        [departmentName],
        (error, result) => {
          if (error) {
            console.error("Error adding department: ", error);
            return;
          }
          console.log("Department added successfully:", result.rows[0]);
          init();
        }
      );
    })
    .catch((error) => {
      console.error("Error adding department: ", error);
    });
}

function addRole() {
  pool.query("SELECT * FROM departments", (error, result) => {
    if (error) {
      console.error("Error fetching departments: ", error);
      return;
    }
    const departments = result.rows.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    inquirer
      .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Enter the title of the new role:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the new role:",
      },
      {
        type: "list",
        name: "departmentId",
        message: "Select the department for the new role:",
        choices: departments,
      },
      ])
      .then((answers) => {
      const { roleTitle, roleSalary, departmentId } = answers;
      pool.query(
        "INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *",
        [roleTitle, roleSalary, departmentId],
        (error, result) => {
        if (error) {
          console.error("Error adding role: ", error);
          return;
        }
        pool.query(
          `SELECT roles.*, departments.name as department_name 
           FROM roles 
           JOIN departments ON roles.department_id = departments.id 
           WHERE roles.id = $1`,
          [result.rows[0].id],
          (error, result) => {
          if (error) {
            console.error("Error fetching role with department name: ", error);
            return;
          }
          console.log(`${roleTitle} successfully created!`)
          console.table(result.rows);
          init();
          }
        );
        }
      );
      })
      .catch((error) => {
      console.error("Error adding role: ", error);
      });
  });
}


function addEmployee() {
  pool.query("SELECT * FROM roles", (error, result) => {
    if (error) {
      console.error("Error fetching roles: ", error);
      return;
    }
    const roles = result.rows.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the first name of the new employee:",
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the last name of the new employee:",
        },
        {
          type: "list",
          name: "roleId",
          message: "Select the role for the new employee:",
          choices: roles,
        },
        {
          type: "input",
          name: "managerName",
          message: "Enter the manager's name for the new employee:",
        },
      ])
      .then((answers) => {
        const { firstName, lastName, roleId, managerName } = answers;
        pool.query(
          "INSERT INTO employees (first_name, last_name, role_id, manager_name) VALUES ($1, $2, $3, $4) RETURNING *",
          [firstName, lastName, roleId, managerName],
          (error, result) => {
            if (error) {
              console.error("Error adding employee: ", error);
              return;
            }
            console.log("Employee added successfully:", result.rows[0]);
            init();
          }
        );
      })
      .catch((error) => {
        console.error("Error adding employee: ", error);
      });
  });
}

function updateEmployeeRole() {
  pool.query("SELECT * FROM employees", (error, result) => {
    if (error) {
      console.error("Error fetching employees: ", error);
      return;
    }
    const employees = result.rows.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Select the employee whose role you want to update:",
          choices: employees,
        },
      ])
      .then((answers) => {
        const { employeeId } = answers;
        pool.query(
          `SELECT employees.first_name, employees.last_name, roles.title AS current_role 
           FROM employees 
           JOIN roles ON employees.role_id = roles.id 
           WHERE employees.id = $1`,
          [employeeId],
          (error, result) => {
            if (error) {
              console.error("Error fetching current role: ", error);
              return;
            }
            const employee = result.rows[0];
            console.log(`Current role of ${employee.first_name} ${employee.last_name}: ${employee.current_role}`);

            pool.query("SELECT * FROM roles", (error, result) => {
              if (error) {
                console.error("Error fetching roles: ", error);
                return;
              }
              const roles = result.rows.map((role) => ({
                name: role.title,
                value: role.id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "roleId",
                    message: "Select the new role for the employee:",
                    choices: roles,
                  },
                ])
                .then((answers) => {
                  const { roleId } = answers;
                  pool.query(
                    "UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING *",
                    [roleId, employeeId],
                    (error, result) => {
                      if (error) {
                        console.error("Error updating employee role: ", error);
                        return;
                      }
                      const updatedEmployee = result.rows[0];
                      pool.query(
                        "SELECT title FROM roles WHERE id = $1",
                        [roleId],
                        (error, result) => {
                          if (error) {
                            console.error("Error fetching new role title: ", error);
                            init();
                            return;
                          }
                          const newRole = result.rows[0].title;
                          console.log(`Employee ${updatedEmployee.first_name} ${updatedEmployee.last_name}'s role updated successfully from ${employee.current_role} to ${newRole}`);
                          init();
                        }
                      );
                    }
                  );
                })
                .catch((error) => {
                  console.error("Error updating employee role: ", error);
                });
            });
          }
        );
      })
      .catch((error) => {
        console.error("Error fetching employee: ", error);
      });
  });
}


//TODO: Create a function to initialise the app
function init() {
    inquirer
      .prompt(applicationOptions)
      .then((answers) => {
        console.log(answers);
        //Actions to perform on user selection
        switch (answers.options) {
            case "View all departments":
          viewAllDepartments();
           break;
            case "View all roles":
          viewAllRoles();
          break;
            case "View all employees":
          viewAllEmployees();
          break;
            case "Add a department":
          addDepartment();
          break;
            case "Add a role":
          addRole();
          break;
            case "Add an employee":
          addEmployee();
          break;
            case "Update an employee role":
          updateEmployeeRole();
            break;
             case "Exit":
          console.log("Exiting the application.");
          pool.end(); // Close the database connection gracefully
          break;
            default:
          console.log("Invalid option selected");
          break;
        }
        })
      .catch((error) => {
        console.error("Error initializing app: ", error);
      });
  }

//TODO: Function call to initialise the app
console.log(chalk.bgGreenBright(`${title}`));
console.log(chalk.greenBright(`This application will store data in the ${process.env.DB_NAME} database for user ${process.env.DB_USER}.`));
init();
