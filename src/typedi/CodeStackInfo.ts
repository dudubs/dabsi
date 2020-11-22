import { readFileSync, realpathSync } from "fs";
import path from "path";
import { Lazy } from "../common/patterns/lazy";

export class CodeStackInfo {
  constructor(protected error: Error) {}

  @Lazy() get lineInfo() {
    const [
      _1,
      _2,
      {
        groups: { fileName, lineNumber, lineColumn } = {
          fileName: "",
          lineNumber: 0,
          lineColumn: 0,
        },
      } = {},
    ] = (this.error.stack || "").matchAll(
      /at [^(]+\((?<fileName>.+):(?<lineNumber>\d+):(?<lineColumn>\d+)\)/g
    );
    return {
      fileName,
      lineNumber: Number(lineNumber),
      lineColumn: Number(lineNumber),
    };
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
    return `At ${this.relativeFileName}, line: ${this.lineInfo.lineNumber}`;
  }
}
