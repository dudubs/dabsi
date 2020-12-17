import { spawnSync } from "child_process";
import fs from "fs";
import path, { relative, resolve } from "path";
import yargs from "yargs";
import { readdirRecursiveSync } from "@dabsi/filesystem/readdirRecursiveSync";
import {
  DABSI_CURRENT_PATH,
  DABSI_NODE_OPTIONS,
  DABSI_PATH,
  DABSI_SRC_PATH,
  NODE_MODULES_PATH,
} from "@dabsi/index";

export function mainCli(): boolean {
  yargs.command(
    "test",
    "",
    y => y,
    ({ _: [_, ...args] }) => {
      const tests: string[] = [];
      const helpers: string[] = [
        relative(DABSI_CURRENT_PATH, path.join(DABSI_SRC_PATH, "register.ts")),
        relative(
          DABSI_CURRENT_PATH,
          path.join(DABSI_SRC_PATH, "jasmine/register.ts")
        ),
      ];

      const paths = args.length
        ? args.map(arg => resolve(DABSI_CURRENT_PATH, arg))
        : [DABSI_SRC_PATH];

      for (const path of paths) {
        if (!fs.existsSync(path)) {
          console.log(`invalid path ${path}`);
          continue;
        }
        if (!fs.statSync(path).isDirectory()) {
          tests.push(path);
          continue;
        }

        for (const fileName of readdirRecursiveSync(path)) {
          if (/Tests\.tsx?$/.test(fileName)) {
            tests.push(fileName);
          } else if (/[\\\/]tests[\\\/]register\.tsx?$/.test(fileName)) {
            helpers.push(relative(DABSI_CURRENT_PATH, fileName));
          }
        }
      }

      spawnSync(
        process.argv[0],
        [
          ...DABSI_NODE_OPTIONS, //
          "--",
          relative(
            DABSI_CURRENT_PATH,
            path.join(NODE_MODULES_PATH, "jasmine/bin/jasmine.js")
          ),
          "--stop-on-failure=true",
          ...helpers.map(fileName => "--helper=" + fileName),
          ...tests,
        ],
        {
          stdio: "inherit",
        }
      );
    }
  ).argv;
  return true;
}
