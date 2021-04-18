import Lazy from "@dabsi/common/patterns/Lazy";
import { realpathSync } from "fs";
import path from "path";

// callstacksymbol
export class CallStackAnchor {
  static capture(lastCalled: Function): CallStackAnchor {
    const o: { stack?: string } = {};
    const limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 1;
    Error.captureStackTrace(o, lastCalled);
    Error.stackTraceLimit = limit;
    return new CallStackAnchor(o.stack || "");
  }

  constructor(protected stack: string) {}

  get path(): string {
    return this._parsed.path;
  }

  get line(): number {
    return this._parsed.line;
  }

  get column(): number {
    return this._parsed.column;
  }

  @Lazy() protected get _parsed(): {
    path: string;
    line: number;
    column: number;
  } {
    const match = this.stack.match(
      /\s+at\s+[^\\\/]*(?<path>[^:]+):(?<line>\d+):(?<column>\d+)/
    );
    if (!match?.groups) {
      console.log({ thisStack: this.stack });
    }
    const { path, line, column } = match!.groups!;
    return { path, line: Number(line), column: Number(column) };
  }

  @Lazy() get description() {
    return `file: ${this.path}, line:${this.line}`;
  }
}
