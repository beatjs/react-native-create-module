import mkdirp from "mkdirp";

export const createFolder = (folder: string) =>
  new Promise<void>((resolve, reject) => {
    if (!folder) {
      resolve();
      return;
    }
    mkdirp(folder)
      .then(() => {
        return resolve();
      })
      .catch((err) => {
        return reject(err);
      });
  });
