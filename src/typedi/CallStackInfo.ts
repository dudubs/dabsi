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

  static getLineInfo(stack: string, fromFileName?: string) {
    for (const lineInfo of this.parseCallStack(stack)) {
      if (!fromFileName) return lineInfo;
      if (lineInfo.fileName === fromFileName) {
        fromFileName = undefined;
      }
    }
  }

  constructor(protected error: Error, protected fromFileName?: string) {}

  @Lazy() get lineInfo() {
    return CallStackInfo.getLineInfo(this.error.stack!, this.fromFileName)!;
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
    return `file: ${this.relativeFileName}, line:${this.lineInfo.lineNumber}`;
  }
}
