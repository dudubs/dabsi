import { touchSet } from "@dabsi/common/set/touchSet";
import { DABSI_SRC_DIR } from "@dabsi/env";
import { LogLevel } from "@dabsi/logging/Logger";
import fs from "fs";
import "jasmine";
import path from "path";
import "./specFilter";

log.setLevel(l => l ^ LogLevel.INFO);

const searchedDirs = new Set<string>();
const srcArgs = process.argv.slice(process.argv.findIndex(x => x === "--") + 1);

{
  const srcPaths = !srcArgs.length
    ? [DABSI_SRC_DIR]
    : srcArgs.map(arg => fs.realpathSync(arg));

  const requireBeforeTests: string[] = [];
  const tests: string[] = [];

  for (let srcPath of srcPaths) {
    const srcPathIsFile = fs.statSync(srcPath).isFile();
    if (srcPathIsFile) {
      tests.push(srcPath);
      srcPath = path.dirname(srcPath);
    }
    for (const testsDir of findTestsDirs(srcPath)) {
      for (const baseName of fs.readdirSync(testsDir)) {
        const fileName = path.join(testsDir, baseName);

        if (/tester\.tsx?$/i.test(fileName)) {
          requireBeforeTests.push(fileName);
        } else if (!srcPathIsFile && /tests\.tsx?$/i.test(fileName)) {
          tests.push(fileName);
        }
      }
    }
  }
  console.log({ srcPaths, requireBeforeTests, tests });

  requireBeforeTests.forEach(moduleName => {
    require(moduleName);
  });

  tests.forEach(moduleName => {
    describe(moduleName, () => {
      require(moduleName);
    });
  });
}

function* findTestsDirs(dir: string) {
  if (!searchedDirs.touch(dir)) return;

  if (/[\\\/]tests$/.test(dir)) {
    yield dir;
    return;
  }

  for (const baseName of fs.readdirSync(dir)) {
    if ([/^old-/i, /^(browser|native)$/].find(p => p.test(baseName))) continue;
    const fileName = path.join(dir, baseName);

    if (fs.statSync(fileName).isDirectory()) {
      yield* findTestsDirs(fileName);
    }
  }
}
