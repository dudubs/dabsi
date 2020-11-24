import { DABSI_NODE_OPTIONS } from "../index";

export const TYPESTACK_CLI_ARGS = [
  ...DABSI_NODE_OPTIONS,
  ...["-r", "tsconfig-paths/register"],
  ...["-r", "@dabsi/register.ts"],
  ...["-r", "@dabsi/typestack/register.ts"],
  "--",
  "src/index.ts",
];
