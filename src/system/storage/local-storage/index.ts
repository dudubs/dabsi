import { DABSI_CURRENT_DIR } from "@dabsi/env";
import { Cli } from "@dabsi/modules/Cli";
import { LocalStorage } from "@dabsi/system/storage/local-storage/LocalStorage";
import Storage from "@dabsi/system/storage/Storage";
import { Inject, Module, Resolver } from "@dabsi/typedi";
import { mkdirSync } from "fs";
import path from "path";

@Module()
export default class LocalStorageModule {
  url = "/storage";

  localDir = path.resolve(DABSI_CURRENT_DIR, "./bundle/local-storage");

  constructor(@Inject(c => c) context, @Inject() cli: Cli) {
    cli.command("start", cli =>
      cli.onRun({
        before: () => {
          mkdirSync(this.localDir, { recursive: true });
        },
      })
    );
    Resolver.provide(
      context,
      Storage.provide(() => {
        return new LocalStorage(this.localDir, "/storage");
      })
    );
  }
}
