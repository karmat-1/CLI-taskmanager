import inquirer from "inquirer";
import Task from './../schema/task.schema.js';
import ora from 'ora'
import chalk from 'chalk';

async function input ()
{
    const answers = await inquirer.prompt( [
        { name: 'title', message: 'Enter a title for your task', type: 'input' },
        { name: 'description', message: 'Enter a description for your task', type: 'input'}
    ] );
    
    return answers;
}

const askQuestions = async () =>
{
    const taskArray = [];
    let loop = false;
    do {
        const userResponse = await input();
        taskArray.push(userResponse);
        const confirmation = await inquirer.prompt( [
            { name: 'confirm', message: 'Do you want to add more tasks?', type: 'confirm' },
        ] );

        if ( confirmation.confirm) loop = true;

        loop = false;
    } while ( loop );
    
    return taskArray;
}

export default async function addTask ()
{
    try {
        // call the function to ask questions
        const userResponse = await askQuestions();

        // create a nice spinner to show that our app is working in the background
        let spinner = ora( 'We are creating your tasks...' ).start();

        //console.log( userResponse );

        // loop over the user response and add it to the database
        userResponse.forEach( async ( response ) => await Task.create( response ) );

        // stop the spinner
        spinner.stop();

        // display a success message in the console
        console.info( chalk.greenBright( 'Your tasks have been successfully created!' ) );
    } catch (e) {
        console.error( chalk.redBright( `We encountered an error while trying to add your tasks` ), e );
        process.exit( 1 );
    }
}