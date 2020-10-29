import { readFileSync } from "fs";

export type StackLinePoint = ReturnType<typeof StackLinePoint>;

export function StackLinePoint() {
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
