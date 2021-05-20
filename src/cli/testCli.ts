import {
  DABSI_CURRENT_DIR,
  DABSI_NODE_OPTIONS,
  DABSI_SRC_DIR,
  DABSI_NM_DIR,
} from "@dabsi/env";
import { spawnSync } from "child_process";
import fs from "fs";
import path, { relative, resolve } from "path";

export default function testCli(args) {
  const tests: string[] = [];

  const paths = args.length
    ? args.map(arg => resolve(DABSI_CURRENT_DIR, arg))
    : [DABSI_SRC_DIR];

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
      process.env.JASMINE_NODE_OPTIONS,
      ...(process.env.DABSI_DEBUG_TESTS ? ["--inspect"] : []),
      "--",
      relative(
        DABSI_CURRENT_DIR,
        path.join(DABSI_NM_DIR, "jasmine/bin/jasmine.js")
      ),
      "--stop-on-failure=true",
      process.env.JASMINE_OPTIONS,
      // "--random=false",
      ...[
        process.env.JASMINE_SEED ? "--seed=" + process.env.JASMINE_SEED : "",
      ].filter(x => !!x),
      path.join(DABSI_SRC_DIR, "jasmine/run.ts"),
      "--",
      ...args,
    ].filter(x => typeof x === "string"),
    {
      stdio: "inherit",
    }
  );
}
