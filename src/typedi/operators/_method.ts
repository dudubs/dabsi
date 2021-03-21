import { IResolver } from "@dabsi/typedi/Resolver";

const NAME = "xxx";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method() {}
