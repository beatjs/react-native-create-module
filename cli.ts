#!/usr/bin/env node

import program from "commander";
import updateNotifier from "update-notifier";

import { args } from "commander";
import { command } from "./command";
import pkg from "./package.json";

updateNotifier({ pkg }).notify();

program
  .usage(command.usage)
  .description(command.description)
  .action(function runAction(this: any) {
    command.func(args, this.opts());
  });

(command.options || []).forEach((opt: any) =>
  program.option(
    opt.command,
    opt.description,
    opt.parse || ((value: any) => value),
    opt.default
  )
);

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
