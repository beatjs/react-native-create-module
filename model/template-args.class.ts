import {
  defaultAuthorEmail,
  defaultAuthorName,
  defaultNamespace,
  defaultGenerateExample,
  defaultGithubAccount,
  defaultLicense,
  defaultModulePrefix,
  defaultName,
  defaultPackageIdentifier,
  defaultPlatforms,
} from "./template.define";

export class TemplateArgs {
  name = defaultName();
  modulePrefix = defaultModulePrefix();
  namespace = defaultNamespace();
  packageIdentifier = defaultPackageIdentifier();
  platforms = defaultPlatforms();
  githubAccount = defaultGithubAccount();
  authorName = defaultAuthorName();
  authorEmail = defaultAuthorEmail();
  license = defaultLicense();
  generateExample = defaultGenerateExample();
}
