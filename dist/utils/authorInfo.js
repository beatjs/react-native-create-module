"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitInit = exports.localAuthorEmail = exports.localAuthorAccount = exports.localAuthorName = void 0;
const child_process_1 = require("child_process");
const localAuthorName = () => {
    child_process_1.execSync("cd ./drop-beat");
    let authorName = child_process_1.execSync("git show -s --format=%cn").toString().trim();
    child_process_1.execSync("cd ../");
    return authorName;
};
exports.localAuthorName = localAuthorName;
const localAuthorAccount = () => {
    return child_process_1.execSync("git show -s --format=%ce").toString().trim();
};
exports.localAuthorAccount = localAuthorAccount;
const localAuthorEmail = () => {
    return child_process_1.execSync("git show -s --format=%ce").toString().trim();
};
exports.localAuthorEmail = localAuthorEmail;
const gitInit = (path) => {
    return child_process_1.execSync("git init" + " " + path)
        .toString()
        .trim();
};
exports.gitInit = gitInit;
