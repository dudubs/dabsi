import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { readFileSync } from "fs";
import path, { dirname, resolve } from "path";

export const DABSI_SRC_DIR = __dirname;

export const DABSI_CURRENT_DIR = process.cwd();

export const DABSI_NODE_OPTIONS = (process.env.DABSI_NODE_OPTIONS || "")
  .split(" ")
  .map(s => s.trim())
  .filter(s => s);

export const DABSI_DIR = dirname(DABSI_SRC_DIR);

export const DABSI_WORKSPACE_DIR = resolve(DABSI_DIR, "..");

export const DABSI_NM_DIR = resolve(DABSI_WORKSPACE_DIR, "node_modules");

export const getWorkspacePackage = SingleCall(() => {
  return JSON.parse(
    readFileSync(path.join(DABSI_WORKSPACE_DIR, "package.json"), "utf8")
  );
});
