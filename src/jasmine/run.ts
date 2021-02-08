import { touchSet } from "@dabsi/common/map/touchSet";
import { DABSI_CURRENT_DIR, DABSI_SRC_DIR } from "@dabsi/env";
import globalTester from "@dabsi/jasmine/globalTester";
import "@dabsi/jasmine/register";
import { LogLevel } from "@dabsi/logging/Logger";
import { readdirSync, statSync } from "fs";
import "jasmine";
import path from "path";

log.setLevel(l => l ^ LogLevel.INFO);

const requireBeforeTests: string[] = [];
const tests: string[] = [];

const searchedDirs = new Set<string>();
const where = process.argv.slice(process.argv.findIndex(x => x === "--") + 1);

if (!where.length) {
  searchTests(DABSI_SRC_DIR);
} else {
  where.forEach(dir => {
    searchTests(path.resolve(DABSI_CURRENT_DIR, dir));
  });
}

for (const callback of globalTester.callbacks) {
  callback();
}

console.log({ requireBeforeTests });

requireBeforeTests.forEach(moduleName => {
  require(moduleName);
});
console.log({ tests });

tests.forEach(moduleName => {
  describe(moduleName, () => {
    require(moduleName);
  });
});

function getModuleName(fileName) {
  return "@dabsi/" + path.posix.relative(DABSI_SRC_DIR, fileName);
}

function searchTests(dir: string) {
  if (!touchSet(searchedDirs, dir)) return;

  if (!statSync(dir).isDirectory()) {
    tests.push(getModuleName(dir));
    return;
  }

  readdirSync(dir).forEach(baseName => {
    const fileName = path.join(dir, baseName);

    if (/^(browser|native)$/.test(baseName)) return;

    if (/tester.tsx?$/.test(baseName)) {
      requireBeforeTests.push(getModuleName(fileName));
      return;
    }
    if (/tests.tsx?$/i.test(baseName)) {
      tests.push(getModuleName(fileName));
    } else if (statSync(fileName).isDirectory()) {
      searchTests(fileName);
    }
  });
}
