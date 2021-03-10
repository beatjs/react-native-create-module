import { TemplateArgs } from "model/template-args.class";
import { Template } from "model/template.interface";

export const android = (platform: string): Template[] => [
  {
    name: () => `${platform}/gradle/wrapper/gradle-wrapper.properties`,
    content: () => `
    distributionBase=GRADLE_USER_HOME
    distributionPath=wrapper/dists
    distributionUrl=https\://services.gradle.org/distributions/gradle-6.8-all.zip
    zipStoreBase=GRADLE_USER_HOME
    zipStorePath=wrapper/dists
    `,
  },
  {
    name: () => `${platform}/gradle.properties`,
    content: () => `
    android.useAndroidX=true
    `,
  },
  {
    name: () => `${platform}/build.gradle`,
    content: () => `buildscript {
    // The Android Gradle plugin is only required when opening the android folder stand-alone.
    // This avoids unnecessary downloads and potential conflicts when the library is included as a
    // module dependency in an application project.
    if (project == rootProject) {
        repositories {
            google()
            jcenter()
        }
        def buildGradleVersion = ext.has('buildGradlePluginVersion') ? ext.get('buildGradlePluginVersion') : '4.1.1'

        dependencies {
            classpath "com.android.tools.build:gradle:$buildGradleVersion"
        }
    }
}

apply plugin: 'com.android.library'

def safeExtGet(prop, fallback) {
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}

android {
    compileSdkVersion safeExtGet('compileSdkVersion', 30)

    defaultConfig {
        minSdkVersion safeExtGet('minSdkVersion', 16)
        targetSdkVersion safeExtGet('targetSdkVersion', 28)

        versionCode 2
        versionName "1.1"
    }
    lintOptions {
       warning 'InvalidPackage', 'MissingPermission'
    }
    testOptions {
        unitTests.returnDefaultValues = true
    }
}

repositories {
    google()
    maven {
        // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
        url "$rootDir/../node_modules/react-native/android"
    }
    jcenter()
}

dependencies {
  implementation "com.facebook.react:react-native:$\{safeExtGet('reactNativeVersion', '+')\}"
  implementation "com.android.installreferrer:installreferrer:$\{safeExtGet('installReferrerVersion', '1.1.2')\}"
  def firebaseBomVersion = safeExtGet("firebaseBomVersion", null)
  def firebaseIidVersion = safeExtGet('firebaseIidVersion', null)
  if (firebaseBomVersion) {
      implementation platform("com.google.firebase:firebase-bom:$\{firebaseBomVersion\}")
      implementation "com.google.firebase:firebase-iid"
  } else if(firebaseIidVersion){
      implementation "com.google.firebase:firebase-iid:$\{firebaseIidVersion\}"
  }else{
      def iidVersion = safeExtGet('googlePlayServicesIidVersion', safeExtGet('googlePlayServicesVersion', '17.0.0'))
      implementation "com.google.android.gms:play-services-iid:$iidVersion"
  }

  testImplementation 'org.junit.jupiter:junit-jupiter-api:5.7.0'
  testImplementation "org.mockito:mockito-core:3.6.28"
}

`,
  },
  {
    name: () => `${platform}/src/main/AndroidManifest.xml`,
    content: (
      args: TemplateArgs
    ) => `<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="${args.packageIdentifier}">

</manifest>
`,
  },
  {
    name: (args: TemplateArgs) =>
      `${platform}/src/main/java/${args.packageIdentifier
        .split(".")
        .join("/")}/${args.name}Module.java`,
    content: (args: TemplateArgs) => `package ${args.packageIdentifier};

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
    name: (args: TemplateArgs) =>
      `${platform}/src/main/java/${args.packageIdentifier
        .split(".")
        .join("/")}/${args.name}Package.java`,
    content: (args: TemplateArgs) => `package ${args.packageIdentifier};

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
public class ${args.name}Package implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new ${args.name}Module(reactContext));
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
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