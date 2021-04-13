import { isUpperCase } from "./isUpperCase";

export const hasPrefix = (name: string[]) =>
  isUpperCase(name, 0) && isUpperCase(name, 1);
