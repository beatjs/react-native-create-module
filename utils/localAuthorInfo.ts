import { execSync } from "child_process";

export const localAuthorName = (path: string) => {
  execSync("cd ./drop-beat");
  let authorName = execSync("git show -s --format=%cn").toString().trim();
  execSync("cd ../");
  return authorName;
};
export const localAuthorAccount = () => {
  return execSync("git show -s --format=%ce").toString().trim();
};
export const localAuthorEmail = () => {
  return execSync("git show -s --format=%ce").toString().trim();
};
export const gitInit = (path: string) => {
  return execSync("git init" + " " + path)
    .toString()
    .trim();
};
