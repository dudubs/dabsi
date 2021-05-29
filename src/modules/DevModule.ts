import LoaderModule from "@dabsi/modules/LoaderModule";
import { Module, Plugin } from "@dabsi/typemodule";

@Module()
export default class DevModule {
  readonly log = log.get("DEV");

  async installLoader(@Plugin() lm: LoaderModule) {
    lm.pushDirectoryLoader(dir => lm.tryToLoad(["dev.ts"], dir));
    lm.pushFileLoader(({ directory, baseName }) =>
      lm.tryToLoad([baseName.replace(/\.ts$/, ".dev.ts")], directory)
    );
  }
}
