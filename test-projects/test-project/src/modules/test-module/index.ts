import { PlatformProvider } from "@dabsi/modules/PlatformBuilder";
import { Module } from "@dabsi/typedi/Module";

@Module({
  dependencies: [],
  providers: [PlatformProvider(__dirname)],
})
export default class MyTestProjectModule {}
