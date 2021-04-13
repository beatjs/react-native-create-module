import { execSync } from "child_process";
import emoji from "node-emoji";
import { createLibrary } from "./lib";

export const command = {
  name: "create-module",
  description: "creates a React Native library for different platforms",
  usage: "[options] <name>",
  func: (args: any, options: any) => {
    const name = args[0];
    const modulePrefix = options.modulePrefix;
    const packageIdentifier = options.packageIdentifier;
    const platforms = options.platforms
      ? options.platforms.split(",")
      : options.platforms;
    const githubAccount = options.githubAccount;
    const authorName = options.authorName;
    const authorEmail = options.authorEmail;
    const license = options.license;
    const generateExample = options.generateExample;
    const beforeCreation = Date.now();
    createLibrary({
      name,
      modulePrefix,
      packageIdentifier,
      platforms,
      githubAccount,
      authorName,
      authorEmail,
      license,
      generateExample,
    })
      .then(() => {
        console.log(`
${emoji.get(
  "books"
)}  Created library ${modulePrefix}-${name} in \`./${modulePrefix}-${name}\`.
${emoji.get("clock9")}  It took ${Date.now() - beforeCreation}ms.
${emoji.get(
  "arrow_right"
)}  To get started type \`cd ./${modulePrefix}-${name}\` and run \`npm install\` and run \`npx pod-install\``);
      })
      .catch((err: { stack: any }) => {
        console.error(`Error while creating library ${name}`);

        if (err.stack) {
          console.error(err.stack);
        }
      });
  },
  options: [
    {
      command: "--module-prefix [modulePrefix]",
      description:
        "The module prefix for the library (Default: `react-native`)",
      default: "react-native",
    },
    {
      command: "--package-identifier [packageIdentifier]",
      description:
        "(Android only!) The package name for the Android module (Default: `com.beatjs.react`)",
      default: "com.beatjs.react",
    },
    {
      command: "--platforms <platforms>",
      description:
        "Platforms the library will be created for. (comma separated; default: `ios,android`)",
      default: "ios,android",
    },
    {
      command: "--github-account [githubAccount]",
      description:
        "The github account where the library is hosted (Default: `account`)",
      default: "account",
    },
    {
      command: "--author-name [authorName]",
      description: "The author's name (Default: `Your Name`)",
      default: "Your Name",
    },
    {
      command: "--author-email [authorEmail]",
      description: "The author's email (Default: `yourname@email.com`)",
      default: "yourname@email.com",
    },
    {
      command: "--license [license]",
      description: "The license type (Default: `MIT License`)",
      default: "MIT License",
    },
    {
      command: "--generate-example",
      description:
        "Generates an example project for iOS and Android and links the library to it",
    },
  ],
};
