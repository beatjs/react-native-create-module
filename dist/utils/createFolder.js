"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = void 0;
const mkdirp_1 = __importDefault(require("mkdirp"));
const createFolder = (folder) => new Promise((resolve, reject) => {
    if (!folder) {
        resolve();
        return;
    }
    mkdirp_1.default(folder)
        .then(() => {
        return resolve();
    })
        .catch((err) => {
        return reject(err);
    });
});
exports.createFolder = createFolder;
