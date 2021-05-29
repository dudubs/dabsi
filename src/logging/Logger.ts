import { values } from "@dabsi/common/object/values";
import { inspect } from "@dabsi/logging/inspect";
import colors from "colors/safe";
import moment from "moment";

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
  enable(level: string & keyof typeof LogLevel): Logger;
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
    LogLevel.INFO |
    LogLevel.WARN |
    LogLevel.FATAL |
    LogLevel.ERROR |
    (process.env.LOG_TRACE ? LogLevel.TRACE : 0);
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
  log.enable = name => {
    log.setLevel(x => x | ((<any>LogLevel)[name] as number));
    return log;
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
    log.info.apply(null, <any>arguments);
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

  const levelColor = levelNameToColor[log.levelName];

  const d = new Date();

  const padZero = x => x.toString().padStart(2, "0");

  const formatedDate = [
    d.getFullYear().toString().slice(2),
    "/",
    padZero(d.getMonth() + 1),
    "/",
    padZero(d.getDay()),
    " ",
    padZero(d.getHours()),
    ":",
    padZero(d.getMinutes()),
    ":",
    padZero(d.getSeconds()),
    // " 0.",
    // d.getMilliseconds(),
  ].join("");

  const loggerNameWithLevel = levelColor(
    colors.bold(
      `[${log.loggerName ? `${log.loggerName} ` : ""}${log.levelName}]`
    )
  );

  const prefix = `${colors.green(formatedDate)} ${loggerNameWithLevel} `;

  console.log(prefix + log.message);
});
