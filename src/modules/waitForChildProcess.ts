import { ChildProcess } from "node:child_process";

export function waitForChildProcess(childProcess: ChildProcess) {
  return new Promise<void>((resolve, reject) => {
    childProcess //
      .on("close", () => resolve())
      .on("error", err => reject(err));
  });
}
