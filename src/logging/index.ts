import { inspect } from "./inspect";

type Logger = {
  (
    callback: (
      formatter: (strings: TemplateStringsArray, ...args) => any
    ) => any
  ): void;
};

// trying to require "util" module.

export function createLogger(level): Logger {
  return function (callback) {
    callback((strings, ...args) => {
      let text = "";
      for (const [index, string] of strings.entries()) {
        text += string;
        if (index in args) {
          text += inspect(args[index]);
        }
      }
      console[level](text);
    });
  };
}

export const logDebug = createLogger("debug");
export const logInfo = createLogger("info");
export const logError = createLogger("error");
