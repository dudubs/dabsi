import { IResolver } from "@dabsi/typedi/Resolver";

const _operator = "xxx";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method() {}
