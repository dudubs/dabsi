import { LoaderModule2 } from "@dabsi/modules2/LoaderModule2";
import { AclModule } from "@dabsi/system/acl/module";
import { SystemModule } from "@dabsi/system/core";
import { Module, Plugin } from "@dabsi/typemodule";
import { SessionModule } from "../../modules/session/module";

@Module({
  dependencies: [AclModule, SystemModule, SessionModule],
})
export class AdminModule {
  installLoader(@Plugin() loaderModule: LoaderModule2) {
    loaderModule.pushLoader(
      () => this.constructor.name,
      dir => loaderModule.tryToLoad(["admin/index.ts", "admin/module.ts"], dir)
    );
  }
}
