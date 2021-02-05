import { Debounce } from "@dabsi/common/async/Debounce";
import watch from "@dabsi/filesystem/watch";
import { DABSI_SRC_DIR } from "@dabsi/env";
import { spawn } from "child_process";

export default function (): boolean {
  const argsWithoutMon = process.argv.filter(x => x !== "--mon");
  if (process.argv.length === argsWithoutMon.length) {
    return false;
  }
  const debounce = Debounce(100);
  console.log("watching", DABSI_SRC_DIR);
  let p: { kill() } | null = null;
  reload();

  const watcher = watch(
    DABSI_SRC_DIR,
    { recursive: true },
    async (e, filename) => {
      if (await debounce()) {
        reload();
      }
    }
  );

  process.on("SIGINT", () => {
    watcher.close();
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
