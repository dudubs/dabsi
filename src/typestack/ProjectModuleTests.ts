import { execFileSync } from "child_process";
import path from "path";
import { mapObjectToArray } from "../common/object/mapObjectToArray";
import { DABSI_NODE_OPTIONS, DABSI_ROOT_DIR } from "../index";
import { TYPESTACK_CLI_ARGS } from "./cli";

testm(__filename, () => {
  it("", () => {
    console.log(make("test-project"));
    console.log(make("test-sub-project"));
  });

  function testProject(projectName) {
    let currentFileName = "";
    const filesMap = {};
    for (let line of make(projectName).split("\n")) {
      if (line.startsWith("make ")) {
        currentFileName = line.match(/"(?<fileName>[^"]*)"/)!.groups!.fileName;
        filesMap[currentFileName] = "";
      } else if (currentFileName && /^[\s\t]+/.test(line)) {
        filesMap[currentFileName] += line.trim() + "\n";
      } else {
        currentFileName = "";
      }
    }
    const files = mapObjectToArray(filesMap, (data: string, name) => ({
      data,
      name,
    }));
    return {
      filesMap,
      files,
    };
  }

  function make(projectName: string) {
    const cwd = path.join(DABSI_ROOT_DIR, "test-projects", projectName);
    console.log({ cwd });
    return execFileSync(
      process.argv[0],
      [...TYPESTACK_CLI_ARGS, "make"],

      {
        encoding: "utf-8",
        cwd,
        env: {
          ...process.env,
          TS_NODE_PROJECT: path.join(cwd, "tsconfig.json"),
          MAKE_TO_STDOUT: "true",
        },
      }
    );
  }
});

// copydir.sync(
//   path.join(DABSI_PATH, "test-projects", "test-project"),
//   path.resolve(DABSI_PATH, "../test-project")
// );
