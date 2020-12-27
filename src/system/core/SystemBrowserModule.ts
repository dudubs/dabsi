import addAll from "@dabsi/common/map/addAll";
import BrowserModule from "@dabsi/modules/BrowserModule";
import { SystemModule } from "@dabsi/system/core";
import { Inject, Module } from "@dabsi/typedi";

@Module()
export default class SystemBrowserModule {
  constructor(
    @Inject() systemModule: SystemModule,
    @Inject() browserModule: BrowserModule
  ) {
    browserModule.install({
      make: async ({ indexFileNames }) => {
        addAll(indexFileNames, await systemModule.getIndexFileNames());
      },
    });
  }
}
