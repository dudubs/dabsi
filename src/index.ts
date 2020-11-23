import { dirname, resolve } from "path";

export const DABSI_SRC_PATH = __dirname;
export const DABSI_PATH = dirname(DABSI_SRC_PATH);
export const NODE_MODULES_PATH = resolve(DABSI_PATH, "../node_modules");
