"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const fs_1 = __importDefault(require("fs"));
const createFile = (filename, content) => new Promise((resolve, reject) => {
    fs_1.default.writeFile(filename, content, (err) => {
        if (err) {
            return reject(err);
        }
        return resolve();
    });
});
exports.createFile = createFile;
