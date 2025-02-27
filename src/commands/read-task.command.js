import Task from './../schema/task.schema.js';
import chalk from 'chalk';
import ora from 'ora'

export default async function readTask ()
{
    try {
        // start my awesome spinner! 🙌
        const spinner = ora( 'We are fetching all your awesome tasks...' ).start()
        
        // fetch all the tasks from the database
        const tasks = await Task.find();

        // stop the spinner when the tasks have been fetched
        spinner.stop();

        if ( tasks.length === 0 ) console.error( chalk.redBright( 'You do not have any tasks yet...' ) )
        
        tasks.forEach( ( task ) =>
        {
            console.log(
                chalk.cyanBright( 'Task Id: ' ) + task.id + '\n' +
                chalk.blueBright( 'Task title: ' ) + task.title + '\n' +
                chalk.yellowBright('Task description: ' ) + task.description + '\n'
            );
        })
    } catch (e) {
        console.error(
          chalk.redBright(
            `We encountered an error while trying to fetch your tasks`
          ),
          e
        );
        process.exit(1);
    }
}