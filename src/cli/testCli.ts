import {
  DABSI_CURRENT_PATH,
  DABSI_NODE_OPTIONS,
  DABSI_SRC_PATH,
  NODE_MODULES_PATH,
} from "@dabsi/index";
import { spawnSync } from "child_process";
import fs from "fs";
import path, { relative, resolve } from "path";

export default function testCli(args) {
  const tests: string[] = [];

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
  }

  spawnSync(
    process.argv[0],
    [
      ...DABSI_NODE_OPTIONS,
      "--",
      relative(
        DABSI_CURRENT_PATH,
        path.join(NODE_MODULES_PATH, "jasmine/bin/jasmine.js")
      ),
      "--stop-on-failure=true",
      path.join(DABSI_SRC_PATH, "jasmine/run.ts"),
      "--",
      ...args,
    ],
    {
      stdio: "inherit",
    }
  );
}
