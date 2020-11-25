import { spawnSync } from "child_process";
import fs from "fs";
import path, { relative, resolve } from "path";
import yargs from "yargs";
import { readdirRecursiveSync } from "../filesystem/readdirRecursiveSync";
import {
  DABSI_CURRENT_PATH,
  DABSI_NODE_OPTIONS,
  DABSI_PATH,
  DABSI_SRC_PATH,
  NODE_MODULES_PATH,
} from "../index";

export function mainCli(): boolean {
  yargs.command(
    "test",
    "",
    y => y,
    ({ _: [_, ...args] }) => {
      let tests: string[] = [];
      if (args.length) {
        for (let arg of args) {
          const path = resolve(DABSI_PATH, arg);
          if (!fs.existsSync(path)) {
            console.log(`invalid path ${path}`);
            continue;
          }
          if (!fs.statSync(path).isDirectory()) {
            tests.push(path);
            continue;
          }
          tests.push(
            ...[...readdirRecursiveSync(path)]
              .filter(p => /Tests\.tsx?$/.test(p))
              .map(p => relative(DABSI_CURRENT_PATH, p))
          );
        }
      } else {
        tests.push(
          ...[...readdirRecursiveSync(DABSI_SRC_PATH)]
            .filter(p => /Tests\.tsx?$/.test(p))
            .map(p => relative(DABSI_CURRENT_PATH, p))
        );
      }
      spawnSync(
        process.argv[0],
        [
          ...DABSI_NODE_OPTIONS, //
          ...["-r", path.join(DABSI_PATH, "src", "register.ts")],
          "--",
          relative(
            DABSI_CURRENT_PATH,
            path.join(NODE_MODULES_PATH, "jasmine/bin/jasmine.js")
          ),
          `--helper=${relative(
            DABSI_CURRENT_PATH,
            path.join(DABSI_SRC_PATH, "jasmine/register.ts")
          )}`,
          "--stop-on-failure=true",
          ...tests,
        ],
        {
          stdio: [0, 1, 2],
        }
      );
    }
  ).argv;
  return true;
}
