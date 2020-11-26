import { readFileSync, realpathSync } from "fs";
import path from "path";
import { Lazy } from "../common/patterns/lazy";
import { IndexedSeq } from "../immutable2";

export const CALL_STACK_PATTERN = /at [^(]+\((?<fileName>.+):(?<lineNumber>\d+):(?<lineColumn>\d+)\)/g;

export class CallStackInfo {
  static *parseCallStack(stack: string) {
    for (let { groups } of stack.matchAll(CALL_STACK_PATTERN)) {
      yield {
        fileName: groups!.fileName,
        lineNumber: Number(groups!.lineNumber),
        lineColumn: Number(groups!.lineColumn),
      };
    }
  }

  static getLineInfo(stack: string, afterFileName?: string) {
    for (const lineInfo of this.parseCallStack(stack)) {
      if (!afterFileName) return lineInfo;
      if (lineInfo.fileName === afterFileName) {
        afterFileName = undefined;
      }
    }
  }

  constructor(protected error: Error) {}

  @Lazy() get lineInfo() {
    return CallStackInfo.getLineInfo(this.error.stack!)!;
  }

  @Lazy() get lineCode() {
    return (
      this.lineInfo.fileName &&
      readFileSync(this.lineInfo.fileName, "utf-8")
        .split("\n", this.lineInfo.lineNumber)
        [this.lineInfo.lineNumber - 1].trim()
    );
  }

  @Lazy() get relativeFileName() {
    return path.relative(realpathSync("."), this.lineInfo.fileName);
  }

  @Lazy() get description() {
    return `\n At ${this.relativeFileName}, line: ${this.lineInfo.lineNumber}`;
  }
}
