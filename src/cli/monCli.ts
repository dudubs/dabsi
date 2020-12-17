import { spawn } from "child_process";
import * as fs from "fs";
import { Debounce } from "@dabsi/common/async/Debounce";
import { DABSI_SRC_PATH } from "@dabsi/index";

export function monCli(): boolean {
  const argsWithoutMon = process.argv.filter(x => x !== "--mon");
  if (process.argv.length === argsWithoutMon.length) {
    return false;
  }
  const debounce = Debounce(100);
  console.log("watching", DABSI_SRC_PATH);
  let p: { kill() } | null = null;
  reload();
  const watch = fs.watch(
    DABSI_SRC_PATH,
    { recursive: true },
    async (e, filename) => {
      if (!/\.tsx?$/.test(filename)) {
        return;
      }
      if (await debounce()) {
        reload();
      }
    }
  );
  process.on("SIGINT", () => {
    watch.close();
    p?.kill();
  });

  function reload() {
    if (p) {
      p.kill();
      console.log("reloading");
    }
    p = spawn(
      argsWithoutMon[0],
      [...process.execArgv, ...argsWithoutMon.slice(1)],
      {
        stdio: "inherit",
      }
    );
  }
  return true;
}
