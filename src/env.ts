import Lazy from "@dabsi/common/patterns/lazy";
import { readdirSync, readFileSync } from "fs";
import path, { dirname, resolve } from "path";

export const DABSI_SRC_DIR = __dirname;

export const DABSI_CURRENT_DIR = process.cwd();

export const DABSI_NODE_OPTIONS = process.env
  .DABSI_NODE_OPTIONS!.split(" ")
  .map(s => s.trim())
  .filter(s => s);

export const DABSI_DIR = dirname(DABSI_SRC_DIR);

export const DABSI_ROOT_DIR = resolve(DABSI_DIR, "..");

export const NODE_MODULES_DIR = resolve(DABSI_ROOT_DIR, "node_modules");

export const getPackageConfig = Lazy(() => {
  return JSON.parse(
    readFileSync(path.join(DABSI_ROOT_DIR, "package.json"), "utf8")
  );
});
