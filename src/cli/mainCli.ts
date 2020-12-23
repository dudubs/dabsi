import yargs from "yargs";
import { DABSI_PATH } from "@dabsi/index";
import testCli from "./testCli";

export function mainCli(): boolean {
  yargs.command(
    "test",
    "",
    y => y,
    ({ _: [_, ...args] }) => {
      testCli(args);
    }
  ).argv;
  return true;
}
