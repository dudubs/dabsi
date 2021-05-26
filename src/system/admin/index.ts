import LoaderModule from "@dabsi/modules/LoaderModule";
import SystemModule from "@dabsi/system/core";
import { Module, Plugin } from "@dabsi/typemodule";
import { SessionModule } from "../../modules/session";

@Module({
  dependencies: [SystemModule, SessionModule],
})
export class AdminModule {
  installLoader(@Plugin() loaderModule: LoaderModule) {
    loaderModule.pushDirectoryLoader(dir =>
      loaderModule.tryToLoad(["admin/index.ts", "admin/module.ts"], dir)
    );
  }
}
