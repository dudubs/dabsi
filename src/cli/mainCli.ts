import yargs from "yargs";
import { DABSI_PATH } from "@dabsi/index";
import testCli from "@dabsi/cli/testCli";

export function mainCli(): boolean {
  yargs
    .command(
      "test",
      "",
      y => y,
      ({ _: [_, ...args] }) => {
        testCli(args);
      }
    )
    .command(
      "script [scriptName] [args...]",
      "",
      y => y,
      async ({ scriptName, ...args }) => {
        const scriptModule = require(`@dabsi/scripts/${scriptName}`);
        await scriptModule.default(args);
      }
    ).argv;
  return true;
}
