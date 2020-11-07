import { readFileSync, realpathSync } from "fs";
import path from "path";

export type StackLastLine = ReturnType<typeof getStackLastLine>;

export function getStackLastLine() {
  const error = new Error();

  return () => {
    const [
      _1,
      _2,
      {
        groups: { sourceFileName, lineNumber, column } = {
          sourceFileName: "",
          lineNumber: 0,
          column: 0,
        },
      } = {},
    ] = (error.stack || "").matchAll(
      /at [^(]+\((?<sourceFileName>.+):(?<lineNumber>\d+):(?<column>\d+)\)/g
    );

    return {
      sourceFileName,
      lineNumber,
      column,
      get relativeSourceFileName() {
        return path.relative(realpathSync("."), sourceFileName);
      },
      get description() {
        return `At ${this.relativeSourceFileName}, line: ${lineNumber}`;
      },
      get line() {
        return (
          sourceFileName &&
          readFileSync(sourceFileName, "utf-8")
            .split("\n", Number(lineNumber))
            [Number(lineNumber) - 1].trim()
        );
      },
    };
  };
}
