import inquirer from 'inquirer';
import Task from '../schema/task.schema.js';
import ora from 'ora'
import chalk from 'chalk'

export async function getTaskIdentifier ()
{
    try {
        // ask the user for the task identifier
        const answer = await inquirer.prompt( [
            { name: 'identifier', message: 'Enter a key you want to use to fetch the task', type: 'input' }
        ] );

        // trim the text to remove whitespaces
        answer.identifier = answer.identifier.trim();

        return answer;
    } catch (e) {
        console.error(chalk.redBright('Something wen wrong while collection user input'), e);
    }
} 

export default async function deleteTask ()
{
    try {
        // get the identifier
        const answer = await getTaskIdentifier();

        // start our awsome spinner
        const spinner = ora( 'Getting rid of the task you do not want anymore...' ).start()
        
        // delete the task
       const response = await Task.deleteOne( answer.identifier )
    
        // stop our spinner
        spinner.stop()

        // confirm that the record is deleted
        if ( typeof response === 'undefined' ) console.info( chalk.greenBright( 'We have gotten rid of that task...' ) );
    } catch (e) {
         console.error(
           chalk.redBright(
             `We encountered an error while trying to get rid of your tasks`
           ),
           e
         );
         process.exit(1);
    }
}
