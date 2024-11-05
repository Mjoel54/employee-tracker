//TODO: Include packages needed for this application
import inquirer from "inquirer";
import colors from "colors";


//TODO: Create an array of options for the user to select from
const applicationOptions = [
    {
        type: "list",
        name: "options",
        message: colors.brightMagenta("What would you like to do?"),
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
]

//TODO: Create a function to initialise the app
function init() {
    inquirer
      .prompt(applicationOptions)
      .then((answers) => {
        //callback function
      })
      .catch((error) => {
        console.error("Error initializing app: ", error);
      });
  }

//TODO: Function call to initialise the app
init();
