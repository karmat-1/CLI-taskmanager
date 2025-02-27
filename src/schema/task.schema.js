import { nanoid } from "nanoid";
import {
  readFromDatabase,
  writeToDatabase,
} from "../database/main.database.js";

const Task = {
  id: nanoid(10),
  title: '',
  description: '',
  completed: false,
  async find() {
    // get all the information from the database
    return await readFromDatabase();
  },
  async findOne(identifier) {
    if (!identifier || typeof identifier !== "string")
      throw new Error(
        "You must provide a key to find the record and this key must be a string"
      );

    // get all the records from the database
    const data = await readFromDatabase();

    // fetch the task that has the given identifier
    // I made an update here too because it was not fetching the information we needed.
    const record = data.find(function (task) {
      return (task.id === identifier || task.title === identifier);
    });

    // return the task
    return record;
  },
  async create(payload) {
    // ensure the user enters a title and a decription when creating a new record
    if (
      !payload.title &&
      !payload.description
    )
      throw new Error(
        "You must provide a title and a description when creating a new task"
      );

    // ensure that no record exists with the same title
    const record = await this.findOne(payload.title);

    // throw an error if the record exists
    if (record)
      throw new Error(
        "A record with this title already exsts please use another title"
      );

    // pull all the records
    const data = await this.find();

    // create the new record
    const newRecord = {
      id: this.id,
      title: payload.title,
      description: payload.description,
      completed: payload.completed ? payload.completed : this.completed,
    };

    // append the new record
    data.push(newRecord);

    // insert the updated records into the database
    await writeToDatabase(data);

    // return the new record
    return newRecord;
  },
  async updateOne(identifier, payload) {
    // ensure the user passes an identifier and the payload
    if (!identifier || typeof identifier !== "string")
      throw new Error(
        "You must provide a key to find the record and this key must be a string"
      );

    if (
      !payload.title &&
      !payload.description
    )
      throw new Error(
        "You must provide a title and a description when updatng an existing task"
      );

    const record = await this.findOne(identifier);

    // throw an error if the record exists
    if (!record) throw new Error("The requested record does not exist.");

    record.title = payload.title;
      record.descripton = payload.description;
    record.completed = payload.completed
        ? payload.completed
          : record.completed;
      
    //   fetch all the records from the database
      const data = await this.find();

    //   remove the record to be updated from the list of records
      const newdataRecord = data.filter( ( existingRecord ) => existingRecord.id !== record.id );

    //   add the updated record to the new list
      newdataRecord.push( record );
    //insert the new list into the database 
      await writeToDatabase( newdataRecord );
  },
    async deleteOne ( identifier )
    {
      //   ensure the user passes a key to fetch the record
      if (!identifier || typeof identifier !== "string")
        throw new Error(
          "You must provide a key to find the record and this key must be a string"
        );

      // get the record the user wants to delete
      const record = await this.findOne(identifier);

      // throw an error if the record exists
      if (!record) throw new Error("The requested record does not exist.");

        // fetch all the records from the database
        const data = await this.find();

        // filter out the record
        const newdataRecord = data.filter( ( existingRecord ) => existingRecord.id !== record.id );

        // insert the new records into the database
      return await writeToDatabase( newdataRecord );
    },
};

export default Task;
