import { values } from "@dabsi/common/object/values";
import { inspect } from "@dabsi/logging/inspect";
import colors from "colors/safe";

export type LogFn = {
  (callback): void;
};

export interface Logger extends LogFn {
  info: LogFn;
  warn: LogFn;
  error: LogFn;
  fatal: LogFn;
  debug: LogFn;
  trace: LogFn;

  get(name: string): Logger;
  setLevel(level: number | ((currentLevel: number) => number));
}

export type LevelName = Exclude<string & keyof typeof LogLevel, "OFF" | "ALL">;

export enum LogLevel {
  OFF = 0b000000,
  INFO = 0b000001,
  WARN = 0b000010,
  ERROR = 0b000100,
  FATAL = 0b001000,
  DEBUG = 0b010000,
  TRACE = 0b100000,
  ALL = 0b111111,
}

let handlers = new Set<(log: Log) => void>();

export function Logger(loggerName: string = "") {
  let currentLevel =
    LogLevel.INFO | LogLevel.WARN | LogLevel.FATAL | LogLevel.ERROR;
  const children: Record<string, Logger> = {};
  log.info = logLevel("INFO");
  log.warn = logLevel("WARN");
  log.error = logLevel("ERROR");
  log.fatal = logLevel("FATAL");
  log.debug = logLevel("DEBUG");
  log.trace = logLevel("TRACE");

  log.setLevel = level => {
    if (typeof level === "function") level = level(currentLevel);
    currentLevel = level;

    for (const child of values(children)) {
      child.setLevel(level);
    }
  };
  log.get = name => {
    return (
      children[name] ||
      (children[name] = Logger(loggerName ? `${loggerName}.${name}` : name))
    );
  };
  return log;

  function logLevel(levelName: LevelName) {
    const level: number = LogLevel[levelName];
    return (msg, ...args) => {
      if (!(level & currentLevel)) return;
      if (typeof msg === "function" && !msg.prototype) {
        msg = msg(inspect);
      }
      msg = String(msg);
      if (args.length) {
        msg += args.map(arg => inspect(arg)).join("\n");
      }
      const log: Log = {
        message: msg,
        date: new Date(),
        levelName,
        level,
        loggerName,
      };
      for (let handler of handlers) {
        handler(log);
      }
    };
  }

  function log() {
    log.info.apply(null, arguments);
  }
}

export type Log = {
  levelName: string;
  level: LogLevel;
  loggerName: string;
  date: Date;
  message: string;
};
export namespace Logger {
  export function register() {}

  export let logToConsole = true;
}

const levelNameToColor: Record<LevelName, (text: string) => string> = {
  INFO: colors.cyan,
  ERROR: colors.red,
  FATAL: text => colors.underline(colors.red(text)),
  WARN: colors.yellow,
  DEBUG: colors.cyan,
  TRACE: colors.blue,
};

handlers.add(log => {
  if (!Logger.logToConsole) return;

  const prefix = `[${log.loggerName ? `${log.loggerName} ` : ""}${
    log.levelName
  }]: `;

  const styledPrefix = levelNameToColor[log.levelName](colors.bold(prefix));

  const prefixPadding = "...".padEnd(prefix.length - 1, " ");

  console.log(
    log.message
      .split("\n")
      .map((line, index) => `${index ? prefixPadding : styledPrefix}${line}`)
      .join("\n")
  );
});
