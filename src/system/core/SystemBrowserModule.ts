import { BrowserPlatformModule } from "../../modules/BrowserPlatformModule";
import { ExpressModule } from "../../modules/ExpressModule";
import { ProjectModuleProvider } from "../../modules/ProjectModuleProvider";
import { Inject, Module } from "../../typedi";
import { SystemModule } from "./SystemModule";

@Module({
  dependencies: [SystemModule, BrowserPlatformModule],
  providers: [ProjectModuleProvider()],
})
export class SystemBrowserModule {
  constructor(@Inject() expressModule: ExpressModule) {}
}
