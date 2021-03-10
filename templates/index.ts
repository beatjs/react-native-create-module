import { android } from "./android";
import { ios } from "./ios";
import { general } from "./general";

import { Template } from "model/template.interface";

const updatePlatformInFile = (platform: string) => (file: any) =>
  Object.assign(file, { platform });

const emptyTemplate: Array<Template> = new Array<Template>();
export const templates = emptyTemplate.concat(
  general(),
  android("android").map(updatePlatformInFile("android")),
  ios("ios").map(updatePlatformInFile("ios"))
);
