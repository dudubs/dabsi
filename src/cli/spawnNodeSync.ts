import { spawnSync } from "child_process";

export function spawnNodeSync(args: string[]) {
  return spawnSync(process.argv[0], [...process.execArgv, "--", ...args], {
    stdio: [0, 1, 2],
  });
}
