"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npmAddScriptSync = void 0;
const jsonfile_1 = require("jsonfile");
// Add a script entry to a package.json file at the packageJsonPath.
// The script parameter shoud be of {key: key, value: value}
const npmAddScriptSync = (packageJsonPath, script) => {
    try {
        var packageJson = jsonfile_1.readFileSync(packageJsonPath);
        if (!packageJson.scripts)
            packageJson.scripts = {};
        if (!script.force && packageJson.scripts[script.key]) {
            throw new Error(`That script entry for key: ${script.key} already exists.`);
        }
        packageJson.scripts[script.key] = script.value;
        jsonfile_1.writeFileSync(packageJsonPath, packageJson, { spaces: 2 });
    }
    catch (e) {
        if (e.message === "ENOENT, no such file or directory 'package.json'") {
            throw new Error(`The package.json at path: ${packageJsonPath} does not exist.`);
        }
        else {
            throw e;
        }
    }
};
exports.npmAddScriptSync = npmAddScriptSync;
