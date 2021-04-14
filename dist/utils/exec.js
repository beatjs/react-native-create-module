"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = require("child_process");
const exec = (command, options) => {
    return new Promise((resolve, reject) => {
        try {
            // We use execSync in here to be able to output the stdout to standard out
            const stdout = child_process_1.execSync(command, options);
            return resolve(stdout);
        }
        catch (e) {
            return reject(e);
        }
    });
};
exports.exec = exec;
