import { DABSI_DIR, DABSI_SRC_DIR } from "@dabsi/env";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { PlatformModule2 } from "@dabsi/modules2/PlatformModule2";
import { CliCommand } from "@dabsi/typecli";
import { Module, Plugin } from "@dabsi/typemodule";
import path from "path";

@Module({ cli: "rpc" })
export class RpcModule2 {
  log = log.get("RPC");

  installPlatform(@Plugin() platformModule2: PlatformModule2) {
    const viewFilePattern = path.join(DABSI_SRC_DIR, "typerpc/**/*view.ts");
    platformModule2.viewLibs.add(viewFilePattern).add(viewFilePattern + "x");
  }

  installLoader(@Plugin() loaderModule: LoaderModule2) {
    //
    loaderModule.pushLoader(
      () => this.constructor.name,
      async dir => {
        for (const baseName of await loaderModule.readDir(dir)) {
          if (!/config\.ts$/i.test(baseName)) continue;
          const configFileName = path.join(dir, baseName);
          //   const config
        }
      }
    );
  }

  installExpress(@Plugin() expressModule: ExpressModule2) {
    expressModule.builders.push(app => {
      //
    });
  }

  @CliCommand("check") check() {
    // loadconfig
  }
}
