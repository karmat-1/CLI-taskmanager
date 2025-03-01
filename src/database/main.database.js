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
