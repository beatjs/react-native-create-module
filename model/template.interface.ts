import { TemplateArgs } from "./template-args.class";

export interface Template {
  name: (args: TemplateArgs) => string;
  content: (args: TemplateArgs) => string;
  platform?: string;
}
