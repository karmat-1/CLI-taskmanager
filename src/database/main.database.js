/* 
I had to look through this code yesterday after class and I made some changes. You will notice that I switched back to using the original plan I had because the second one was not working so fine. So far, I have tested this and it works. You can use this as a basis for the next class we will have
*/
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const filePath = join(process.cwd(), "./src/database/data.json");

export const readFromDatabase = async () => {
  const fileReader = function () {
    return readFileSync(filePath);
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(JSON.parse(fileReader())), 5000);
  });
};

export const writeToDatabase = async (payload) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(writeFileSync(filePath, JSON.stringify(payload, null, 2)));
    }, 5000);
  });
};
