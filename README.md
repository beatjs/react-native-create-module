# react-native-create-module
Tool to create a React Native library with a single command.

![](https://github.com/beatjs/react-native-create-module/blob/master/docs/usage.gif)

### Why might you need this?
If you are looking to create a native module for React Native, you need some native code for each platform you want to support and then some JavaScript code to bind it all together. Setting this up by yourself can be time-consuming.

This is where this tool comes in. It creates a boilerplate with all current best practices in mind.
Why not use `react-native new-library`? Unfortunately that command doesn't create an up-to-date library, requires an already initialized React Native project and only sets up the iOS side of things.

Caution: This only creates native modules without a view component.

## Installation
Requirements: Node 6.0+
```
$ npm install -g react-native-create-module
```

## Command-line usage

Navigate into an empty directory to execute the command.
```
$ react-native-create-module AwesomeModule
```

This will create the folder `AwesomeModule` in which the library will be created in.

Now install dependencies by running this command in the newly created library.
```
$ npm install
```

```
Usage: react-native-create-module [options] <name>

Options:

  -h, --help                                output usage information
  -V, --version                             output the version number
  --module-prefix <modulePrefix>            The module prefix for the library (Default: `react-native`)
  --package-identifier <packageIdentifier>  (Android only!) The package name for the Android module (Default: `com.beatjs`)
   (Default: The name as PascalCase)
  --platforms <platforms>                   Platforms the library will be created for. (comma separated; default: `ios,android`)
  --github-account <github-account>         The github account where the library is hosted (Default: `github-account`)
  --author-name <name>                      The author's name (Default: `Your Name`)
  --author-email <email>                    The author's email (Default: `yourname@email.com`)
  --license <license>                       The license type of this library (Default: `MIT License`)
```

## Programmatic usage
```javascript
const createLibrary = require('react-native-create-module');

createLibrary({
  name: 'AwesomeModule'
}).then(() => {
  console.log('Oh yay! Awesome module has been created!');
})
```

#### Options
```javascript
{
  name: String, /* The name of the library (Default: Library) */
  modulePrefix: String, /* The module prefix for the library (Default: react-native) */
  platforms: Array, /* Platforms the library will be created for. (Default: ['ios', 'android']) */
  packageIdentifier: String, /* (Android only!) The package name for the Android module (Default: com.beatjs) */
  githubAccount: String, /* The github account where the library is hosted (Default: `github-account`) */
  authorName: String, /* The author's name (Default: `Your Name`) */
  authorEmail: String, /* The author's email (Default: `yourname@email.com`) */ 
  license: String, /* The license type of this library (Default: `MIT License`) */
}
```

## Acknowledgements
`react-native-share` (https://github.com/EstebanFuentealba/react-native-share) has been a great source of inspiration for this project.

## License
MIT
