/* eslint max-len: 0 */

import { TemplateArgs } from "model/template-args.class";
import { Template } from "model/template.interface";

export const ios = (platform: string): Template[] => [
  {
    name: (args: TemplateArgs) => `${args.name}.podspec`,
    content: (args: TemplateArgs) => `require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "${args.name}"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  ${args.name}
                   DESC
  s.homepage     = "https://github.com/${args.name}/${args.name}"
  s.license    = { :type => "MIT", :file => "LICENSE" }
  s.author       = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/${args.name}.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React-Core"
end

`,
  },
  {
    name: () => `${platform}/Podfile`,
    content: () => `
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '11.0'
# use_frameworks!
target 'DropBeat' do
  config = use_native_modules!

  use_react_native!(:path => config["reactNativePath"])
end

`,
  },
  {
    name: (args: TemplateArgs) => `${platform}/RCT${args.name}Module.h`,
    content: (
      args: TemplateArgs
    ) => `#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface RCT${args.name}Module : NSObject <RCTBridgeModule>

@end
`,
  },
  {
    name: (args: TemplateArgs) => `${platform}/RCT${args.name}Module.m`,
    content: (args: TemplateArgs) => `#import "RCT${args.name}Module.h"

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
    name: (args: TemplateArgs) =>
      `${platform}/${args.name}.xcworkspace/contents.xcworkspacedata`,
    content: (args: TemplateArgs) => `<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
      location = "group:${args.name}.xcodeproj">
   </FileRef>
</Workspace>
`,
  },
  {
    name: (args: TemplateArgs) =>
      `${platform}/${args.name}.xcodeproj/project.pbxproj`,
    content: (args: TemplateArgs) => `// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 46;
	objects = {

/* Begin PBXBuildFile section */
		B3E7B58A1CC2AC0600A0062D /* RCT${args.name}Module.m in Sources */ = {isa = PBXBuildFile; fileRef = B3E7B5891CC2AC0600A0062D /* RCT${args.name}Module.m */; };
/* End PBXBuildFile section */

/* Begin PBXCopyFilesBuildPhase section */
		58B511D91A9E6C8500147676 /* CopyFiles */ = {
			isa = PBXCopyFilesBuildPhase;
			buildActionMask = 2147483647;
			dstPath = "include/$(PRODUCT_NAME)";
			dstSubfolderSpec = 16;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXCopyFilesBuildPhase section */

/* Begin PBXFileReference section */
		134814201AA4EA6300B7C361 /* lib${args.name}.a */ = {isa = PBXFileReference; explicitFileType = archive.ar; includeInIndex = 0; path = lib${args.name}.a; sourceTree = BUILT_PRODUCTS_DIR; };
		B3E7B5881CC2AC0600A0062D /* RCT${args.name}Module.h */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.h; path = RCT${args.name}Module.h; sourceTree = "<group>"; };
		B3E7B5891CC2AC0600A0062D /* RCT${args.name}Module.m */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.objc; path = RCT${args.name}Module.m; sourceTree = "<group>"; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		58B511D81A9E6C8500147676 /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		134814211AA4EA7D00B7C361 /* Products */ = {
			isa = PBXGroup;
			children = (
				134814201AA4EA6300B7C361 /* lib${args.name}.a */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		58B511D21A9E6C8500147676 = {
			isa = PBXGroup;
			children = (
				B3E7B5881CC2AC0600A0062D /* RCT${args.name}Module.h */,
				B3E7B5891CC2AC0600A0062D /* RCT${args.name}Module.m */,
				134814211AA4EA7D00B7C361 /* Products */,
			);
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		58B511DA1A9E6C8500147676 /* ${args.name} */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = 58B511EF1A9E6C8500147676 /* Build configuration list for PBXNativeTarget "${args.name}" */;
			buildPhases = (
				58B511D71A9E6C8500147676 /* Sources */,
				58B511D81A9E6C8500147676 /* Frameworks */,
				58B511D91A9E6C8500147676 /* CopyFiles */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = ${args.name};
			productName = RCTDataManager;
			productReference = 134814201AA4EA6300B7C361 /* lib${args.name}.a */;
			productType = "com.apple.product-type.library.static";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		58B511D31A9E6C8500147676 /* Project object */ = {
			isa = PBXProject;
			attributes = {
				LastUpgradeCheck = 0920;
				ORGANIZATIONNAME = Facebook;
				TargetAttributes = {
					58B511DA1A9E6C8500147676 = {
						CreatedOnToolsVersion = 6.1.1;
					};
				};
			};
			buildConfigurationList = 58B511D61A9E6C8500147676 /* Build configuration list for PBXProject "${args.name}" */;
			compatibilityVersion = "Xcode 3.2";
			developmentRegion = English;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
			);
			mainGroup = 58B511D21A9E6C8500147676;
			productRefGroup = 58B511D21A9E6C8500147676;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				58B511DA1A9E6C8500147676 /* ${args.name} */,
			);
		};
/* End PBXProject section */

/* Begin PBXSourcesBuildPhase section */
		58B511D71A9E6C8500147676 /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				B3E7B58A1CC2AC0600A0062D /* RCT${args.name}Module.m in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
		58B511ED1A9E6C8500147676 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				GCC_C_LANGUAGE_STANDARD = gnu99;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_SYMBOLS_PRIVATE_EXTERN = NO;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 8.0;
				MTL_ENABLE_DEBUG_INFO = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
			};
			name = Debug;
		};
		58B511EE1A9E6C8500147676 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++0x";
				CLANG_CXX_LIBRARY = "libc++";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = YES;
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				GCC_C_LANGUAGE_STANDARD = gnu99;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 8.0;
				MTL_ENABLE_DEBUG_INFO = NO;
				SDKROOT = iphoneos;
				VALIDATE_PRODUCT = YES;
			};
			name = Release;
		};
		58B511F01A9E6C8500147676 /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				HEADER_SEARCH_PATHS = (
				"$(inherited)",
					/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include,
					"$(SRCROOT)/../../../React/**",
					"$(SRCROOT)/../../react-native/React/**",
				);
				LIBRARY_SEARCH_PATHS = "$(inherited)";
				OTHER_LDFLAGS = "-ObjC";
				PRODUCT_NAME = ${args.name};
				SKIP_INSTALL = YES;
			};
			name = Debug;
		};
		58B511F11A9E6C8500147676 /* Release */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				HEADER_SEARCH_PATHS = (
					"$(inherited)",
					/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include,
					"$(SRCROOT)/../../../React/**",
					"$(SRCROOT)/../../react-native/React/**",
				);
				LIBRARY_SEARCH_PATHS = "$(inherited)";
				OTHER_LDFLAGS = "-ObjC";
				PRODUCT_NAME = ${args.name};
				SKIP_INSTALL = YES;
			};
			name = Release;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		58B511D61A9E6C8500147676 /* Build configuration list for PBXProject "${args.name}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				58B511ED1A9E6C8500147676 /* Debug */,
				58B511EE1A9E6C8500147676 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
		58B511EF1A9E6C8500147676 /* Build configuration list for PBXNativeTarget "${args.name}" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				58B511F01A9E6C8500147676 /* Debug */,
				58B511F11A9E6C8500147676 /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		};
/* End XCConfigurationList section */
	};
	rootObject = 58B511D31A9E6C8500147676 /* Project object */;
}
`,
  },
];