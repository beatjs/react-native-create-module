import { execSync } from "child_process"

export const exec = (command: any, options: any) => {
  return new Promise((resolve, reject) => {
    try {
      // We use execSync in here to be able to output the stdout to standard out
      const stdout = execSync(command, options);
      return resolve(stdout);
    } catch (e) {
      return reject(e);
    }
  });
};
