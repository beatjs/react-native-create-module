"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templates = void 0;
const android_1 = require("./android");
const ios_1 = require("./ios");
const general_1 = require("./general");
const updatePlatformInFile = (platform) => (file) => Object.assign(file, { platform });
const emptyTemplate = new Array();
exports.templates = emptyTemplate.concat(general_1.general(), android_1.android("android").map(updatePlatformInFile("android")), ios_1.ios("ios").map(updatePlatformInFile("ios")));
