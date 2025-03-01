// import deleteTask from "./commands/delete-task.command.js";

// deleteTask();

// import readTask from "./commands/read-task.command.js";

// readTask();

// import addTask from "./commands/add-task.command.js";

// addTask();

import readline from "readline";
import deleteTask from "./commands/delete-task.command.js";
import readTask from "./commands/read-task.command.js";
import addTask from "./commands/add-task.command.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log("\nChoose a task to perform:");
  console.log("1. Add Task");
  console.log("2. Read Task");
  console.log("3. Delete Task");
 

  rl.question("Enter the number of the task: ", (answer) => {
    switch (answer.trim()) {
      case "1":
        addTask();
        break;
      case "2":
        readTask();
        break;
      case "3":
        deleteTask();
        break;
      default:
        console.log("Invalid option. Please choose 1, 2, 3");
        showMenu();
    }
  });
}

showMenu();

