import BrowserModule from "@dabsi/modules/BrowserModule";
import ExpressModule from "@dabsi/modules/ExpressModule";
import { SystemModule } from "@dabsi/system/core/SystemModule";
import { Inject, Module } from "@dabsi/typedi";

@Module({})
export class SystemBrowserModule {
  constructor(
    @Inject() systemModule: SystemModule,
    @Inject() browserModule: BrowserModule
  ) {
    browserModule.install({
      make: async ({ indexFileNames }) => {
        await systemModule.loadSystem();
        systemModule.indexFileNames.forEach(indexFileName => {
          indexFileNames.add(indexFileName);
        });
      },
    });
  }
}
