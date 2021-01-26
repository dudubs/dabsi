import { touchSet } from "@dabsi/common/map/touchSet";
import { DABSI_CURRENT_PATH, DABSI_SRC_PATH } from "@dabsi/index";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import { readdirSync, statSync } from "fs";
import "jasmine";
import path from "path";
import "@dabsi/jasmine/register";
import globalTester from "@dabsi/jasmine/globalTester";

const searchedDirs = new Set<string>();
const where = process.argv.slice(process.argv.findIndex(x => x === "--") + 1);

if (!where.length) {
  searchTests(DABSI_SRC_PATH);
} else {
  where.forEach(dir => {
    searchTests(path.resolve(DABSI_CURRENT_PATH, dir));
  });
}
for (const callback of globalTester.callbacks) {
  callback();
}

function loadTests(fileName) {
  const moduleName = "@dabsi/" + relativePosixPath(DABSI_SRC_PATH, fileName);
  describe(moduleName.replace(/\.tsx?$/, ""), () => {
    require("@dabsi/" + relativePosixPath(DABSI_SRC_PATH, fileName));
  });
}

function searchTests(dir: string) {
  if (!touchSet(searchedDirs, dir)) return;

  if (!statSync(dir).isDirectory()) {
    loadTests(dir);
    return;
  }

  readdirSync(dir).forEach(baseName => {
    const fileName = path.join(dir, baseName);
    if (/Tests.tsx?$/.test(baseName)) {
      loadTests(fileName);
    } else if (statSync(fileName).isDirectory()) {
      searchTests(fileName);
    }
  });
}
