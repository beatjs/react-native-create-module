import { hasPrefix } from "./utils/hasPrefix";
import { createFile } from "./utils/createFile";
import { createFolder } from "./utils/createFolder";
import { npmAddScriptSync } from "./utils/npmAddScriptSync";
import { exec } from "./utils/exec";
import { paramCase } from "param-case";
import path from "path";
import { pascalCase } from "pascal-case";

import { templates } from "./templates";

import { execSync } from "child_process";
import { example } from "./templates/example";
import {
  gitInit,
  localAuthorName,
  localAuthorEmail,
} from "./utils/authorInfo";
import { TemplateArgs } from "./models/template-args.class";
import {
  defaultAuthorEmail,
  defaultGenerateExample,
  defaultGithubAccount,
  defaultLicense,
  defaultModulePrefix,
  defaultName,
  defaultPackageIdentifier,
  defaultPlatforms,
} from "./models/template.define";
import { Template } from "./models/template.interface";

const renderTemplate = async (
  name: string,
  template: any,
  templateArgs?: TemplateArgs
) => {
  const filename = path.join(name, template.name(templateArgs));
  const baseDir = filename.split(path.basename(filename))[0];

  await createFolder(baseDir);
  return await createFile(filename, template.content(templateArgs));
};

export const createLibrary = async ({
  name = defaultName(),
  modulePrefix = defaultModulePrefix(),
  packageIdentifier = defaultPackageIdentifier(),
  platforms = defaultPlatforms(),
  githubAccount = defaultGithubAccount(),
  authorName = defaultName(),
  authorEmail = defaultAuthorEmail(),
  license = defaultLicense(),
  generateExample = defaultGenerateExample(),
}) => {
  if (platforms.length === 0) {
    throw new Error(
      "Please specify at least one platform to generate the library."
    );
  }

  if (packageIdentifier === defaultPackageIdentifier()) {
    console.warn(`While \`{DEFAULT_PACKAGE_IDENTIFIER}\` is the default package
      identifier, it is recommended to customize the package identifier.`);
  }

  const rootFolderName = `${modulePrefix}-${paramCase(name)}`;
  await createFolder(rootFolderName);
  await Promise.all(
    templates
      .filter((template: Template) => {
        if (template.platform) {
          return platforms.indexOf(template.platform) >= 0;
        }
        return true;
      })
      .map((template: Template) => {
        if (!template.name) {
          return Promise.resolve();
        }
        const templateArgs = new TemplateArgs();
        templateArgs.name = `${pascalCase(name)}`;
        templateArgs.modulePrefix = `${paramCase(name)}`;
        templateArgs.packageIdentifier = packageIdentifier;
        templateArgs.namespace = pascalCase(name)
          .split(/(?=[A-Z])/)
          .join(".");
        templateArgs.githubAccount = githubAccount;
        templateArgs.authorName = authorName;
        templateArgs.authorEmail = authorEmail;
        templateArgs.license = license;
        templateArgs.generateExample = generateExample;

        return renderTemplate(rootFolderName, template, templateArgs);
      })
  );
  // Generate the example if necessary
  if (!generateExample) {
    return Promise.resolve();
  }
  const initExampleOptions = {
    cwd: `./${rootFolderName}`,
    stdio: "inherit",
  };
  await exec(`npx react-native init example`, initExampleOptions);
  // Execute the example template
  // const exampleTemplates = require('./templates/example');
  await Promise.all(
    example().map((template: any) => {
      return renderTemplate(rootFolderName, template);
    })
  );
  return await new Promise<void>((resolve) => {
    // Add postinstall script to example package.json
    const pathExampleApp = `./${rootFolderName}/example`;
    const moduleName = `${paramCase(name)}`;
    npmAddScriptSync(`${pathExampleApp}/package.json`, {
      key: "postinstall",
      value: `node ../scripts/examples_postinstall.js node_modules/${moduleName}`,
    });

    // Add and link the new library
    const addLinkLibraryOptions: any = {
      cwd: pathExampleApp,
      stdio: "inherit",
    };
    try {
      execSync("yarn add file:../", addLinkLibraryOptions);
    } catch (e) {
      execSync("npm install ../", addLinkLibraryOptions);
      execSync("npm install", addLinkLibraryOptions);
    }

    return resolve();
  });
};
