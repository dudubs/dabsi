import { spawnSync } from "child_process";
import path from "path";
import { DABSI_CURRENT_PATH } from "../index";
import { TYPESTACK_CLI_ARGS } from "../typestack/cli";

export function typestackCli(): boolean {
  if (process.argv[2] === "typestack") {
    spawnSync(
      process.argv[0],
      [
        ...TYPESTACK_CLI_ARGS,
        ...process.argv.slice(process.argv.indexOf("typestack") + 1),
      ],
      {
        stdio: [0, 1, 2],
        env: {
          ...process.env,
          TS_NODE_PROJECT: path.resolve(DABSI_CURRENT_PATH, "tsconfig.json"),
        },
      }
    );

    return true;
  }
  return false;
}
