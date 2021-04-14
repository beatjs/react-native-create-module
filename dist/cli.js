#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const update_notifier_1 = __importDefault(require("update-notifier"));
const commander_2 = require("commander");
const command_1 = require("./command");
const package_json_1 = __importDefault(require("./package.json"));
update_notifier_1.default({ pkg: package_json_1.default }).notify();
commander_1.default
    .usage(command_1.command.usage)
    .description(command_1.command.description)
    .action(function runAction() {
    command_1.command.func(commander_2.args, this.opts());
});
(command_1.command.options || []).forEach((opt) => commander_1.default.option(opt.command, opt.description, opt.parse || ((value) => value), opt.default));
commander_1.default.parse(process.argv);
if (!commander_1.default.args.length) {
    commander_1.default.help();
}
