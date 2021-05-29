import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import tryToRequire from "@dabsi/common/tryToRequest";

// trying to require "util" module.

const util: any = tryToRequire("util");

inspect.custom = util?.inspect.custom ?? Symbol();
export function inspect(...args): string {
  if (args.length === 1) {
    args = [...args, { depth: 100 }];
  }
  const [value] = args;

  if (typeof value?.inspect === "function") {
    return value.inspect();
  }

  if (util) return util.inspect.apply(util, args);

  const method = value?.[inspect.custom];
  if (method) return method.apply(value);
  if (Array.isArray(value)) {
    return (
      "[" +
      value
        .toSeq()
        .map(value => inspect(value))
        .join(", ") +
      "]"
    );
  }
  if (Object.getPrototypeOf(value) === Object.prototype) {
    return `{${mapObjectToArray(
      value,
      (value, key) => inspect(key) + ": " + inspect(value)
    )}}`;
  }
  return JSON.stringify(value);
}
