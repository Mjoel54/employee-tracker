//TODO: Include packages needed for this application
import inquirer from "inquirer";
import dotenv from "dotenv";
import { pool, connectToDb } from "./connection.js";
dotenv.config();

await connectToDb();

//TODO: Create an array of options for the user to select from
// const applicationOptions: any = [
//     {
//         type: "list",
//         name: "options",
//         message: "What would you like to do?",
//         choices: [
//             "View all departments",
//             "View all roles",
//             "view all employees",
//             "Add a department",
//             "Add a role",
//             "Add an employee",
//             "Update an employee role",
//         ]
//     }
// ]

//

function viewAllDepartments() {
    pool.query("SELECT * FROM department", (error, result) => {
        if (error) {
            console.error("Error viewing all departments: ", error);
            return;
        }
        console.table(result.rows);
    })
};

//TODO: Create a function to initialise the app
function init() {
    inquirer
      .prompt(
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "view all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
            ]
        }
      )
      .then((answers) => {
        console.log(answers);
        //Switch statements
        if (answers.options == "View all departments") {
            viewAllDepartments();
        }
      })
      .catch((error) => {
        console.error("Error initializing app: ", error);
      });
  }

//TODO: Function call to initialise the app
init();
