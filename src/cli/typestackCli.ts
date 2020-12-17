import { spawnSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import yargs from "yargs";
import { DABSI_CURRENT_PATH, DABSI_ROOT_DIR } from "@dabsi/index";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import { TYPESTACK_CLI_ARGS } from "@dabsi/typestack/cli";

let config!: {
  current: string[];
};

export function projectCli(): boolean {
  let cwd = DABSI_CURRENT_PATH;
  useConfig();

  if (config.current.length) {
    cwd = path.resolve(
      DABSI_ROOT_DIR,
      config.current[config.current.length - 1]
    );
    if (!existsSync(cwd)) {
      console.log(`No have project ${config.current}`);
      return true;
    }
  }

  spawnSync(
    process.argv[0],
    [
      ...TYPESTACK_CLI_ARGS,
      ...process.argv.slice(process.argv.indexOf("typestack") + 1),
    ],
    {
      stdio: "inherit",
      cwd,
      env: {
        ...process.env,
        TS_NODE_PROJECT: path.resolve(cwd, "tsconfig.json"),
      },
    }
  );

  return true;
}

export function typestackCli(): boolean {
  return (
    process.argv[2] === "typestack" && //
    projectCli()
  );
}

function useConfig() {
  if (config) return config;
  const fileName = path.join(DABSI_ROOT_DIR, "typestack.json");
  const currentConfig = (config = JSON.parse(readFileSync(fileName, "utf8")));
  process.on("exit", () => {
    if (currentConfig !== config) {
      writeFileSync(fileName, JSON.stringify(config, null, 2));
    }
  });
}
