import {
  DABSI_CURRENT_DIR,
  DABSI_NODE_OPTIONS,
  DABSI_ROOT_DIR,
  getPackageConfig,
} from "@dabsi/env";
import { spawnSync } from "child_process";
import { realpathSync } from "fs";
import path from "path";

export default function typestackCli(): boolean {
  if (process.argv[2] !== "typestack") return false;

  let currentWorkingProject: string = DABSI_CURRENT_DIR;

  const config = getPackageConfig().typestack || {};

  if (process.env.CWP) {
    currentWorkingProject = realpathSync(process.env.CWP);
  } else if (config.current) {
    currentWorkingProject = realpathSync(
      path.resolve(DABSI_ROOT_DIR, config.current)
    );
  }

  spawnSync(
    process.argv[0],
    [
      ...[
        ...DABSI_NODE_OPTIONS,
        ...["-r", "@dabsi/register.ts"],
        ...["-r", "@dabsi/typestack/register.ts"],
        "--",
        "src/index.ts",
      ],
      ...process.argv.slice(process.argv.indexOf("typestack") + 1),
    ],
    {
      stdio: "inherit",
      cwd: currentWorkingProject,
      env: {
        ...process.env,
        TS_NODE_PROJECT: path.resolve(currentWorkingProject, "tsconfig.json"),
      },
    }
  );
  return true;
}
