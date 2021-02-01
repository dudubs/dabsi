import { Module } from "@dabsi/typedi";
import { PlatformModule, PlatformModuleContext } from "./PlatformModule";

@Module()
export class CommonPlatformModule extends PlatformModule {
  constructor(context: PlatformModuleContext) {
    super(context, "common");
  }
}
