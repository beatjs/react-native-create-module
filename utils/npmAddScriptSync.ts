import { readFileSync, writeFileSync } from "jsonfile";

// Add a script entry to a package.json file at the packageJsonPath.
// The script parameter shoud be of {key: key, value: value}
export const npmAddScriptSync = (packageJsonPath: any, script: any) => {
  try {
    var packageJson = readFileSync(packageJsonPath);
    if (!packageJson.scripts) packageJson.scripts = {};
    if (!script.force && packageJson.scripts[script.key]) {
      throw new Error(
        `That script entry for key: ${script.key} already exists.`
      );
    }
    packageJson.scripts[script.key] = script.value;
    writeFileSync(packageJsonPath, packageJson, { spaces: 2 });
  } catch (e) {
    if (e.message === "ENOENT, no such file or directory 'package.json'") {
      throw new Error(
        `The package.json at path: ${packageJsonPath} does not exist.`
      );
    } else {
      throw e;
    }
  }
};
