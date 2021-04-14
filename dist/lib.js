"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLibrary = void 0;
const createFile_1 = require("./utils/createFile");
const createFolder_1 = require("./utils/createFolder");
const npmAddScriptSync_1 = require("./utils/npmAddScriptSync");
const exec_1 = require("./utils/exec");
const param_case_1 = require("param-case");
const path_1 = __importDefault(require("path"));
const pascal_case_1 = require("pascal-case");
const templates_1 = require("./templates");
const child_process_1 = require("child_process");
const example_1 = require("./templates/example");
const template_args_class_1 = require("./models/template-args.class");
const template_define_1 = require("./models/template.define");
const renderTemplate = (name, template, templateArgs) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = path_1.default.join(name, template.name(templateArgs));
    const baseDir = filename.split(path_1.default.basename(filename))[0];
    yield createFolder_1.createFolder(baseDir);
    return yield createFile_1.createFile(filename, template.content(templateArgs));
});
const createLibrary = ({ name = template_define_1.defaultName(), modulePrefix = template_define_1.defaultModulePrefix(), packageIdentifier = template_define_1.defaultPackageIdentifier(), platforms = template_define_1.defaultPlatforms(), githubAccount = template_define_1.defaultGithubAccount(), authorName = template_define_1.defaultName(), authorEmail = template_define_1.defaultAuthorEmail(), license = template_define_1.defaultLicense(), generateExample = template_define_1.defaultGenerateExample(), }) => __awaiter(void 0, void 0, void 0, function* () {
    if (platforms.length === 0) {
        throw new Error("Please specify at least one platform to generate the library.");
    }
    if (packageIdentifier === template_define_1.defaultPackageIdentifier()) {
        console.warn(`While \`{DEFAULT_PACKAGE_IDENTIFIER}\` is the default package
      identifier, it is recommended to customize the package identifier.`);
    }
    const rootFolderName = modulePrefix.trim().length > 0 ? `${modulePrefix}-${param_case_1.paramCase(name)}` : `${param_case_1.paramCase(name)}`;
    yield createFolder_1.createFolder(rootFolderName);
    yield Promise.all(templates_1.templates
        .filter((template) => {
        if (template.platform) {
            return platforms.indexOf(template.platform) >= 0;
        }
        return true;
    })
        .map((template) => {
        if (!template.name) {
            return Promise.resolve();
        }
        const templateArgs = new template_args_class_1.TemplateArgs();
        templateArgs.name = `${pascal_case_1.pascalCase(name)}`;
        templateArgs.modulePrefix = `${param_case_1.paramCase(name)}`;
        templateArgs.packageIdentifier = packageIdentifier;
        templateArgs.namespace = pascal_case_1.pascalCase(name)
            .split(/(?=[A-Z])/)
            .join(".");
        templateArgs.githubAccount = githubAccount;
        templateArgs.authorName = authorName;
        templateArgs.authorEmail = authorEmail;
        templateArgs.license = license;
        templateArgs.generateExample = generateExample;
        return renderTemplate(rootFolderName, template, templateArgs);
    }));
    // Generate the example if necessary
    if (!generateExample) {
        return Promise.resolve();
    }
    const initExampleOptions = {
        cwd: `./${rootFolderName}`,
        stdio: "inherit",
    };
    yield exec_1.exec(`npx react-native init example`, initExampleOptions);
    // Execute the example template
    // const exampleTemplates = require('./templates/example');
    yield Promise.all(example_1.example().map((template) => {
        return renderTemplate(rootFolderName, template);
    }));
    return yield new Promise((resolve) => {
        // Add postinstall script to example package.json
        const pathExampleApp = `./${rootFolderName}/example`;
        const moduleName = `${param_case_1.paramCase(name)}`;
        npmAddScriptSync_1.npmAddScriptSync(`${pathExampleApp}/package.json`, {
            key: "postinstall",
            value: `node ../scripts/examples_postinstall.js node_modules/${moduleName}`,
        });
        // Add and link the new library
        const addLinkLibraryOptions = {
            cwd: pathExampleApp,
            stdio: "inherit",
        };
        try {
            child_process_1.execSync("yarn add file:../", addLinkLibraryOptions);
        }
        catch (e) {
            child_process_1.execSync("npm install ../", addLinkLibraryOptions);
            child_process_1.execSync("npm install", addLinkLibraryOptions);
        }
        return resolve();
    });
});
exports.createLibrary = createLibrary;
