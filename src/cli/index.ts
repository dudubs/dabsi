import { spawn } from "child_process";
import { watch } from "fs";
import * as fs from "fs";
import { join, relative, resolve } from "path";
import yargs from "yargs";
import { DABSI_PATH, DABSI_SRC_PATH, NODE_MODULES_PATH } from "../index";
import { readdirRecursiveSync } from "./readdirRecursiveSync";
import { spawnNodeSync } from "./spawnNodeSync";

const cwd = process.cwd();

function Debounce(ms: number) {
  let timeout: any = null;
  let counter = 0;
  return async () => {
    let id = ++counter;
    if (timeout) clearTimeout(timeout);
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
    return id === counter;
  };
}
if (require.main === module)
  (() => {
    {
      const argsWithoutMon = process.argv.filter(x => x !== "--mon");
      if (process.argv.length > argsWithoutMon.length) {
        const debounce = Debounce(100);
        let p: { kill() } | null = null;
        reload();
        const w = watch(DABSI_SRC_PATH, { recursive: true }, async (e, f) => {
          if (await debounce()) {
            reload();
          }
        });
        process.on("SIGINT", () => {
          w.close();
          p?.kill();
        });
        function reload() {
          if (p) {
            p.kill();
            console.log("reloading");
          }
          p = spawn(
            argsWithoutMon[0],
            [...process.execArgv, ...argsWithoutMon.slice(1)],
            {
              stdio: [0, 1, 2],
            }
          );
        }
        return;
      }
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
                  .map(p => relative(cwd, p))
              );
            }
          } else {
            tests.push(
              ...[...readdirRecursiveSync(DABSI_SRC_PATH)]
                .filter(p => /Tests\.tsx?$/.test(p))
                .map(p => relative(cwd, p))
            );
          }
          spawnNodeSync([
            relative(cwd, join(NODE_MODULES_PATH, "jasmine/bin/jasmine.js")),
            // "--",
            `--helper=${relative(
              cwd,
              join(DABSI_SRC_PATH, "jasmine/register.ts")
            )}`,
            "--stop-on-failure=true",
            ...tests,
          ]);
        }
      ).argv;
    }
  })();
