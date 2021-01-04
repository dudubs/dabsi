import { touchSet } from "@dabsi/common/map/touchSet";
import nested from "@dabsi/common/string/nested";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { DABSI_CURRENT_PATH, DABSI_PATH, DABSI_ROOT_DIR } from "@dabsi/index";
import { Cli, CliError } from "@dabsi/modules/Cli";
import { Hookable } from "@dabsi/modules/Hookable";
import { relativePosixPath } from "@dabsi/modules/pathHelpers";
import { Inject, Module } from "@dabsi/typedi";
import fs from "fs";

@Module()
export class MakeModule {
  log = log.get("MAKE");

  onMake = Hookable<() => Awaitable>();

  write: boolean = false;

  constructor(@Inject() cli: Cli) {
    cli.command("make", cli =>
      cli.onRun(async ({ write = false }) => {
        this.write = write;
        if (DABSI_CURRENT_PATH === DABSI_PATH)
          throw new CliError(`You can't run make on "${DABSI_PATH}".`);
        await this.onMake.invoke();
      })
    );
  }

  protected makeDirCache = new Set();
  async makeDir(dirName) {
    if (touchSet(this.makeDirCache, dirName)) {
      await fs.promises.mkdir(dirName, { recursive: true });
    }
  }

  async makeFile(outFileName, content: string) {
    this.log(`make "${relativePosixPath(DABSI_ROOT_DIR, outFileName)}".`);
    if (this.write) {
      await fs.promises.writeFile(outFileName, content);
    } else {
      console.log(nested(content));
    }
  }

  async makeJsonFile(path, data: any) {
    await this.makeFile(path, JSON.stringify(data, null, 2));
  }
}
