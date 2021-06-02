import testCli from "@dabsi/cli/testCli";
import yargs from "yargs";

export default function mainCli(): boolean {
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
    )
    .command(
      "run [moduleName] [args...]",
      "",
      y => y,
      async ({ _: args, moduleName }) => {
        const scriptModule = require(`@dabsi/${moduleName}/cli`);
        await scriptModule.default(process.argv.slice(2));
      }
    )
    .help(false).argv;
  return true;
}
