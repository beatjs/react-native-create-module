import fs from "fs";

export const createFile = (filename: any, content: any) =>
  new Promise<void>((resolve, reject) => {
    fs.writeFile(filename, content, (err: any) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
