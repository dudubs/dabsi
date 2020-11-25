import fs from "fs";
import path from "path";
import { touchSet } from "../common/map/touchSet";
import { DABSI_CURRENT_PATH, DABSI_PATH } from "../index";
import { Cli, CliError } from "../modules/Cli";
import { relativePosixPath } from "../modules/pathHelpers";
import { Inject } from "../typedi/Inject";
import { Module } from "../typedi/Module";

@Module()
export class MakeModule {
  cli = new Cli().push({
    run: () => {
      if (DABSI_CURRENT_PATH === DABSI_PATH)
        throw new CliError(`You can't run make on "${DABSI_PATH}".`);
    },
  });

  constructor(@Inject() cli: Cli) {
    cli.connect("make", this.cli);
  }

  protected makeDirCache = new Set();
  async makeDir(dirName) {
    if (touchSet(this.makeDirCache, dirName)) {
      await fs.promises.mkdir(dirName, { recursive: true });
    }
  }
  async makeFile(outFileName, data: string) {
    console.log(
      `make "${relativePosixPath(DABSI_CURRENT_PATH, outFileName)}".`
    );
    if (process.env.MAKE_TO_STDOUT) {
      console.log(("\n" + data).replace(/\n/g, "\n  ").replace(/\n/, ""));
    } else {
      await this.makeDir(path.dirname(outFileName));
      await fs.promises.writeFile(outFileName, data);
    }
  }

  async makeJsonFile(path, data: any) {
    await this.makeFile(path, JSON.stringify(data, null, 2));
  }
}