import SystemModule from "@dabsi/system/core";
import { Module } from "@dabsi/typedi";

@Module({
  dependencies: [SystemModule],
})
export default class SystemTestingModule {}
