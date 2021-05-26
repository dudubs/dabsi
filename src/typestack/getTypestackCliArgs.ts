import { DABSI_SRC_DIR } from "@dabsi/env";
import path from "path";

export const TYPESTACK_CLI_ARG = "typestack";

export default function getTypestackCliArgs(args: any[]) {
  return [
    ...process.execArgv,
    path.join(DABSI_SRC_DIR, "cli/index.ts"),
    TYPESTACK_CLI_ARG,
    ...args,
  ];
}
