//TODO: Include packages needed for this application
import inquirer from "inquirer";
import dotenv from "dotenv";
import { pool, connectToDb } from "./connection.js";
dotenv.config();

await connectToDb();

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
  pool.query("SELECT * FROM roles", (error, result) => {
      if (error) {
          console.error("Error viewing all departments: ", error);
          return;
      }
      console.table(result.rows);
      init();
  })
};

function viewAllEmployees() {
  pool.query("SELECT * FROM employees", (error, result) => {
      if (error) {
          console.error("Error viewing all departments: ", error);
          return;
      }
      console.table(result.rows);
      init();
  })
};

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
          // Function to add a department
          break;
            case "Add a role":
          // Function to add a role
          break;
            case "Add an employee":
          // Function to add an employee
          break;
            case "Update an employee role":
          // Function to update an employee role
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
init();
