import { dirname, resolve } from "path";

export const DABSI_SRC_PATH = __dirname;
export const DABSI_CURRENT_PATH = process.cwd();
export const DABSI_NODE_OPTIONS = process.env
  .DABSI_NODE_OPTIONS!.split(" ")
  .map(s => s.trim())
  .filter(s => s);

export const DABSI_PATH = dirname(DABSI_SRC_PATH);
export const DABSI_ROOT_DIR = resolve(DABSI_PATH, "..");
export const NODE_MODULES_PATH = resolve(DABSI_ROOT_DIR, "node_modules");
