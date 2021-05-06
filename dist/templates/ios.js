"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ios = void 0;
const param_case_1 = require("param-case");
const ios = (platform) => [
    {
        name: (args) => `${param_case_1.paramCase(args.name)}.podspec`,
        content: (args) => `
Pod::Spec.new do |s|
  s.name = "${param_case_1.paramCase(args.name)}"
  s.version = "0.0.1"
  s.summary = "An runtime base on react-native."
  s.description = 
	<<-DESC
	"Introduce this library for your App, development by react-native code."
	DESC
  s.homepage = "https://github.com/${args.githubAccount}/${param_case_1.paramCase(args.name)}"
	s.license = { :type => "MIT" }
  s.author = { "${args.authorName}" => "${args.authorEmail}" }
	s.platforms = { :ios => "11.0" }
  s.source = { :git => "https://github.com/${args.githubAccount}/${param_case_1.paramCase(args.name)}.git", :tag => s.version.to_s }

  s.source_files = "${platform}/${args.name}/**/*.{h,m}"

  s.dependency "react-ios", "~> 0.63.4.1"
end

`,
    },
    {
        name: () => `${platform}/Podfile`,
        content: (args) => `
platform :ios, '11.0'

use_frameworks!

target '${args.name}' do
	pod '${param_case_1.paramCase(args.name)}', :path => '../'
end

`,
    },
    {
        name: (args) => `${platform}/${args.name}/RCT${args.name}Module.h`,
        content: (args) => `#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface RCT${args.name}Module : NSObject <RCTBridgeModule>

@end
`,
    },
    {
        name: (args) => `${platform}/${args.name}/RCT${args.name}Module.m`,
        content: (args) => `#import "RCT${args.name}Module.h"

@implementation RCT${args.name}Module

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(hello) {
    NSLog(@"Hello React Native!");
}

RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback) {
    // TODO: Implement
}

@end
`,
    },
    {
        name: (args) => `${platform}/${args.name}/${args.name}.h`,
        content: () => `#import <Foundation/Foundation.h>

//! Project version number for ReactComponent.
FOUNDATION_EXPORT double ReactComponentVersionNumber;

//! Project version string for ReactComponent.
FOUNDATION_EXPORT const unsigned char ReactComponentVersionString[];

// In this header, you should import all the public headers of your framework using statements like #import <ReactComponent/PublicHeader.h>
`,
    },
    {
        name: (args) => `${platform}/${args.name}/Info.plist`,
        content: () => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleDevelopmentRegion</key>
	<string>$(DEVELOPMENT_LANGUAGE)</string>
	<key>CFBundleExecutable</key>
	<string>$(EXECUTABLE_NAME)</string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>$(PRODUCT_NAME)</string>
	<key>CFBundlePackageType</key>
	<string>$(PRODUCT_BUNDLE_PACKAGE_TYPE)</string>
	<key>CFBundleShortVersionString</key>
	<string>1.0</string>
	<key>CFBundleVersion</key>
	<string>$(CURRENT_PROJECT_VERSION)</string>
</dict>
</plist>
`,
    },
    {
        name: (args) => `${platform}/${args.name}.xcworkspace/contents.xcworkspacedata`,
        content: (args) => `<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
      location = "group:${args.name}.xcodeproj">
   </FileRef>
</Workspace>
`,
    },
    {
        name: (args) => `${platform}/${args.name}.xcodeproj/project.pbxproj`,
        content: (args) => `// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 50;
	objects = {

/* Begin PBXBuildFile section */
		B59C3A44262474C000023194 /* ${args.name}.h in Headers */ = {isa = PBXBuildFile; fileRef = B59C3A42262474C000023194 /* ${args.name}.h */; settings = {ATTRIBUTES = (Public, ); }; };
		B3E7B5881CC2AC0600A0062D /* RCT${args.name}Module.h in Headers */ = {isa = PBXBuildFile; fileRef = B59C3A5D26253EA800023194 /* RCT${args.name}Module.h */; };
		B3E7B5891CC2AC0600A0062D /* RCT${args.name}Module.m in Sources */ = {isa = PBXBuildFile; fileRef = B59C3A5E26253EA800023194 /* RCT${args.name}Module.m */; };
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
		B59C3A3F262474C000023194 /* ${args.name}.framework */ = {isa = PBXFileReference; explicitFileType = wrapper.framework; includeInIndex = 0; path = ${args.name}.framework; sourceTree = BUILT_PRODUCTS_DIR; };
		B59C3A42262474C000023194 /* ${args.name}.h */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.h; path = ${args.name}.h; sourceTree = "<group>"; };
		B59C3A43262474C000023194 /* Info.plist */ = {isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = "<group>"; };
		B59C3A5D26253EA800023194 /* RCT${args.name}Module.h */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.h; path = RCT${args.name}Module.h; sourceTree = "<group>"; };
		B59C3A5E26253EA800023194 /* RCT${args.name}Module.m */ = {isa = PBXFileReference; lastKnownFileType = sourcecode.c.objc; path = RCT${args.name}Module.m; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
			B59C3A3C262474C000023194 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
			B59C3A35262474C000023194 = {
			isa = PBXGroup;
			children = (
				B59C3A41262474C000023194 /* ${args.name} */,
				B59C3A40262474C000023194 /* Products */,
			);
			sourceTree = "<group>";
		};
		B59C3A40262474C000023194 /* Products */ = {
			isa = PBXGroup;
			children = (
				B59C3A3F262474C000023194 /* ${args.name}.framework */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		B59C3A41262474C000023194 /* ${args.name} */ = {
			isa = PBXGroup;
			children = (
				B59C3A42262474C000023194 /* ReactComponent.h */,
				B59C3A5D26253EA800023194 /* RCT${args.name}Module.h */,
				B59C3A5E26253EA800023194 /* RCT${args.name}Module.m */,
				B59C3A43262474C000023194 /* Info.plist */,
			);
			path = ${args.name};
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXHeadersBuildPhase section */
		B59C3A3A262474C000023194 /* Headers */ = {
			isa = PBXHeadersBuildPhase;
			buildActionMask = 2147483647;
			files = (
				B3E7B5881CC2AC0600A0062D /* RCT${args.name}Module.h in Headers */,
				B59C3A44262474C000023194 /* ${args.name}.h in Headers */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXHeadersBuildPhase section */

/* Begin PBXNativeTarget section */
		B59C3A3E262474C000023194 /* ${args.name} */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = B59C3A47262474C000023194 /* Build configuration list for PBXNativeTarget "ReactComponent" */;
			buildPhases = (
				B59C3A3A262474C000023194 /* Headers */,
				B59C3A3B262474C000023194 /* Sources */,
				B59C3A3C262474C000023194 /* Frameworks */,
				B59C3A3D262474C000023194 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = ${args.name};
			productName = ${args.name};
			productReference = B59C3A3F262474C000023194 /* ${args.name}.framework */;
			productType = "com.apple.product-type.framework";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		B59C3A36262474C000023194 /* Project object */ = {
			isa = PBXProject;
			attributes = {
				LastUpgradeCheck = 1230;
				TargetAttributes = {
					B59C3A3E262474C000023194 = {
						CreatedOnToolsVersion = 12.3;
					};
				};
			};
			buildConfigurationList = B59C3A39262474C000023194 /* Build configuration list for PBXProject "ReactComponent" */;
			compatibilityVersion = "Xcode 9.3";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = B59C3A35262474C000023194;
			productRefGroup = B59C3A40262474C000023194 /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				B59C3A3E262474C000023194 /* ${args.name} */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		B59C3A3D262474C000023194 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		B59C3A3B262474C000023194 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				B3E7B5891CC2AC0600A0062D /* RCT${args.name}Module.m in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
		B59C3A45262474C000023194 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				CURRENT_PROJECT_VERSION = 1;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 11;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				VERSIONING_SYSTEM = "apple-generic";
				VERSION_INFO_PREFIX = "";
			};
			name = Debug;
		};
		B59C3A46262474C000023194 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++14";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				CURRENT_PROJECT_VERSION = 1;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				GCC_C_LANGUAGE_STANDARD = gnu11;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 11;
				MTL_ENABLE_DEBUG_INFO = NO;
				MTL_FAST_MATH = YES;
				SDKROOT = iphoneos;
				VALIDATE_PRODUCT = YES;
				VERSIONING_SYSTEM = "apple-generic";
				VERSION_INFO_PREFIX = "";
			};
			name = Release;
		};
		B59C3A48262474C000023194 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Automatic;
				DEFINES_MODULE = YES;
				DYLIB_COMPATIBILITY_VERSION = 1;
				DYLIB_CURRENT_VERSION = 1;
				DYLIB_INSTALL_NAME_BASE = "@rpath";
				INFOPLIST_FILE = ${args.name}/Info.plist;
				INSTALL_PATH = "$(LOCAL_LIBRARY_DIR)/Frameworks";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
					"@loader_path/Frameworks",
				);
				PRODUCT_BUNDLE_IDENTIFIER = com.beatjs.${args.name};
				PRODUCT_NAME = "$(TARGET_NAME:c99extidentifier)";
				SKIP_INSTALL = YES;
				SUPPORTS_MACCATALYST = NO;
				TARGETED_DEVICE_FAMILY = 1;
			};
			name = Debug;
		};
		B59C3A49262474C000023194 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				CODE_SIGN_STYLE = Automatic;
				DEFINES_MODULE = YES;
				DYLIB_COMPATIBILITY_VERSION = 1;
				DYLIB_CURRENT_VERSION = 1;
				DYLIB_INSTALL_NAME_BASE = "@rpath";
				INFOPLIST_FILE = ${args.name}/Info.plist;
				INSTALL_PATH = "$(LOCAL_LIBRARY_DIR)/Frameworks";
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
					"@loader_path/Frameworks",
				);
				PRODUCT_BUNDLE_IDENTIFIER = com.beatjs.${args.name};
				PRODUCT_NAME = "$(TARGET_NAME:c99extidentifier)";
				SKIP_INSTALL = YES;
				SUPPORTS_MACCATALYST = NO;
				TARGETED_DEVICE_FAMILY = 1;
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		B59C3A39262474C000023194 /* Build configuration list for PBXProject "${args.name}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				B59C3A45262474C000023194 /* Debug */,
				B59C3A46262474C000023194 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		B59C3A47262474C000023194 /* Build configuration list for PBXNativeTarget "${args.name}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				B59C3A48262474C000023194 /* Debug */,
				B59C3A49262474C000023194 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */
	};
	rootObject = B59C3A36262474C000023194 /* Project object */;
}

`,
    },
];
exports.ios = ios;
