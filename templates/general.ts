import { paramCase } from "param-case";
import { TemplateArgs } from "../models/template-args.class";
import { Template } from "../models/template.interface";

export const general = (): Template[] => [
  {
    name: () => `LICENSE`,
    content: () => `The MIT License (MIT)

Copyright (c) 2021 beatjs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`,
  },
  {
    name: () => "README.md",
    content: (args: TemplateArgs) => {
      let manualInstallation = "";

      if (args.platforms.indexOf("ios") >= 0) {
        manualInstallation += `
#### iOS

1. In XCode, in the project navigator, right click \`Libraries\` ➜ \`Add Files to [your project's name]\`
2. Go to \`node_modules\` ➜ \`${args.modulePrefix}\` and add \`${args.name}.xcodeproj\`
3. In XCode, in the project navigator, select your project. Add \`lib${args.name}.a\` to your project's \`Build Phases\` ➜ \`Link Binary With Libraries\`
4. Run your project (\`Cmd+R\`)<
`;
      }

      if (args.platforms.indexOf("android") >= 0) {
        manualInstallation += `
#### Android

1. Open up \`android/app/src/main/java/[...]/MainApplication.java\`
  - Add \`import ${args.packageIdentifier}.${args.name}Package;\` to the imports at the top of the file
  - Add \`new ${args.name}Package()\` to the list returned by the \`getPackages()\` method
2. Append the following lines to \`android/settings.gradle\`:
  	\`\`\`
  	include ':${args.modulePrefix}'
  	project(':${args.modulePrefix}').projectDir = new File(rootProject.projectDir, 	'../node_modules/${args.modulePrefix}/android')
  	\`\`\`
3. Insert the following lines inside the dependencies block in \`android/app/build.gradle\`:
  	\`\`\`
      compile project(':${args.modulePrefix}')
  	\`\`\`
`;
      }

      return `# ${args.modulePrefix}

## Getting started

\`$ npm install ${args.modulePrefix} --save\`

### Mostly automatic installation

\`$ react-native link ${args.modulePrefix}\`

### Manual installation

${manualInstallation}

## Usage
\`\`\`javascript
import ${args.name} from '${args.modulePrefix}';

// TODO: What to do with the module?
${args.name};
\`\`\`
  `;
    },
  },
  {
    name: () => "package.json",
    content: (args: TemplateArgs) => {
      let dependencies = `
    "react": "16.13.1",
    "react-native": "^0.63.4"`;
      return `{
  "name": "${args.modulePrefix}",
  "title": "${args.modulePrefix
    .split("-")
    .map((word) => word[0].toUpperCase() + word.substr(1))
    .join(" ")}",
  "version": "1.0.0",
  "description": "Tool to create a React Native library with a command-line interface",
  "main": "index.js",
  "scripts": {
    "ios": "react-native run-ios",
    "android": "react-native run-android",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/${args.githubAccount}/${paramCase(args.name)}.git",
    "baseUrl": "https://github.com/${args.githubAccount}/${paramCase(args.name)}"
  },
  "keywords": [
    "react-native"
  ],
  "author": {
    "name": "${args.authorName}",
    "email": "${args.authorEmail}"
  },
  "license": "${args.license}",
  "licenseFilename": "LICENSE",
  "readmeFilename": "README.md",
  "peerDependencies": {
    ${dependencies}
  },
  "devDependencies": {
    ${dependencies}
  }
}
`;
    },
  },
  {
    name: () => "index.js",
    content: (
      args: TemplateArgs
    ) => `import { NativeModules } from 'react-native';

const { ${args.name} } = NativeModules;
${args.name}.hello();

export default ${args.name};
`,
  },
  {
    name: () => ".gitignore",
    content: (args: TemplateArgs) => {
      let content = `# OSX
#
.DS_Store

# node.js
#
node_modules/
npm-debug.log
yarn-error.log
`;

      if (args.platforms.indexOf("ios") >= 0) {
        content += `

# Xcode
#
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
project.xcworkspace

# ios
ios/Pods
`;
      }

      if (args.platforms.indexOf("android") >= 0) {
        content += `

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml

# BUCK
buck-out/
\\.buckd/
*.keystore
`;
      }

      return content;
    },
  },
  {
    name: () => ".gitattributes",
    content: (args: TemplateArgs) => {
      if (args.platforms.indexOf("ios") >= 0) {
        return "*.pbxproj -text\n";
      }

      return "";
    },
  },
  {
    name: () => ".npmignore",
    content: (args: TemplateArgs) => {
      if (args.generateExample) {
        return "example\n";
      }

      return "";
    },
  },
];
