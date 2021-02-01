import { Module } from "@dabsi/typedi";
import { PlatformModule, PlatformModuleContext } from "./PlatformModule";

@Module()
export class ViewPlatformModule extends PlatformModule {
  constructor(context: PlatformModuleContext) {
    super(context, "view");
  }
}
