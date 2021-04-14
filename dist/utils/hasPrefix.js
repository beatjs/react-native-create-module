"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPrefix = void 0;
const isUpperCase_1 = require("./isUpperCase");
const hasPrefix = (name) => isUpperCase_1.isUpperCase(name, 0) && isUpperCase_1.isUpperCase(name, 1);
exports.hasPrefix = hasPrefix;
