import SystemModule from "@dabsi/system/core/module";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [SystemModule],
})
export default class SystemTestingModule {}
