"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateArgs = void 0;
const template_define_1 = require("./template.define");
class TemplateArgs {
    constructor() {
        this.name = template_define_1.defaultName();
        this.modulePrefix = template_define_1.defaultModulePrefix();
        this.namespace = template_define_1.defaultNamespace();
        this.packageIdentifier = template_define_1.defaultPackageIdentifier();
        this.platforms = template_define_1.defaultPlatforms();
        this.githubAccount = template_define_1.defaultGithubAccount();
        this.authorName = template_define_1.defaultAuthorName();
        this.authorEmail = template_define_1.defaultAuthorEmail();
        this.license = template_define_1.defaultLicense();
        this.generateExample = template_define_1.defaultGenerateExample();
    }
}
exports.TemplateArgs = TemplateArgs;
