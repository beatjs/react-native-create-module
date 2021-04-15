"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.android = void 0;
const android = (platform) => [
    {
        name: () => `${platform}/gradle/wrapper/gradle-wrapper.properties`,
        content: () => `distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-6.5-all.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`,
    },
    {
        name: () => `${platform}/gradle.properties`,
        content: () => `android.useAndroidX=true
    `,
    },
    {
        name: () => `${platform}/build.gradle`,
        content: () => `buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:4.1.2'
    }

    // The Android Gradle plugin is only required when opening the android folder stand-alone.
    // This avoids unnecessary downloads and potential conflicts when the library is included as a
    // module dependency in an application project.
    if (project == rootProject) {
        repositories {
            google()
            jcenter()
        }
        def buildGradleVersion = ext.has('buildGradlePluginVersion') ? ext.get('buildGradlePluginVersion') : '4.1.2'
  
        dependencies {
            classpath "com.android.tools.build:gradle:$buildGradleVersion"
        }
    }
}
  
apply plugin: 'com.android.library'
  
android {
    compileSdkVersion 30
      
    defaultConfig {
        minSdkVersion 16
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"
    }
    lintOptions {
       warning 'InvalidPackage', 'MissingPermission'
    }
    testOptions {
        unitTests.returnDefaultValues = true
    }
    compileOptions {
      sourceCompatibility JavaVersion.VERSION_1_8
      targetCompatibility JavaVersion.VERSION_1_8
  }
}
  
repositories {
    google()
    jcenter()
    maven { url 'https://jitpack.io' }
}
  
dependencies {
    implementation 'com.github.beatjs:react-android:0.63.4.+'
}
`,
    },
    {
        name: () => `${platform}/src/main/AndroidManifest.xml`,
        content: (args) => `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="${args.packageIdentifier}">
</manifest>
`,
    },
    {
        name: (args) => `${platform}/src/main/java/${args.packageIdentifier
            .split(".")
            .join("/")}/${args.name}Module.java`,
        content: (args) => `package ${args.packageIdentifier};

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class ${args.name}Module extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public ${args.name}Module(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "${args.name}Module";
    }

    @ReactMethod
    public void hello() {
      System.out.println("Hello React Native!");
    }

    @ReactMethod
    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
        // TODO: Implement
    }
}`,
    },
    {
        name: (args) => `${platform}/src/main/java/${args.packageIdentifier
            .split(".")
            .join("/")}/${args.name}Package.java`,
        content: (args) => `package ${args.packageIdentifier};

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class ${args.name}Package implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new ${args.name}Module(reactContext));
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
`,
    },
    {
        name: () => `${platform}/README.md`,
        content: () => `README
======

If you want to publish the lib as a maven dependency, follow these steps before publishing a new version to npm:

1. Be sure to have the Android [SDK](https://developer.android.com/studio/index.html) and [NDK](https://developer.android.com/ndk/guides/index.html) installed
2. Be sure to have a \`local.properties\` file in this folder that points to the Android SDK and NDK
\`\`\`
ndk.dir=/Users/{username}/Library/Android/sdk/ndk-bundle
sdk.dir=/Users/{username}/Library/Android/sdk
\`\`\`
3. Delete the \`maven\` folder
4. Run \`sudo ./gradlew installArchives\`
5. Verify that latest set of generated files is in the maven folder with the correct version number
`,
    },
];
exports.android = android;
