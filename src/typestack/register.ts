import yargs from "yargs";
import { Cli } from "../modules/Cli";
import { getLastModule } from "../typedi/Module";
import { ModuleRunner } from "../typedi/ModuleRunner";

setImmediate(async () => {
  const moduleRunner = new ModuleRunner();
  const module = moduleRunner.get(getLastModule());
  const cli = moduleRunner.get(Cli);

  await cli.main(yargs.scriptName("ts"));

  // console.log(
  //   Object.keys(require.cache)
  //     .toSeq()
  //     .toSet()
  //     .filter(path => !/[\\\/]node_modules[\\\/]/.test(path))
  //     .map(path => path.replace(/[\\\/]src[\\\/].*$/, ""))
  //     .toArray()
  // );
});
