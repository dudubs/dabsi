import { spawnSync } from "child_process";
import { DABSI_NODE_OPTIONS } from "../index";

export function spawnNodeSync(args: string[]) {
  return spawnSync(process.argv[0], [...DABSI_NODE_OPTIONS, "--", ...args], {
    stdio: [0, 1, 2],
  });
}
