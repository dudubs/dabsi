import buildCountRefs from "@dabsi/system/data/buildCountRefs";
import SystemDataModule from "@dabsi/system/data";
import SystemStorageModule from "@dabsi/system/storage";
import { Image } from "@dabsi/system/storage/image/entities/Image";
import { Inject, Module } from "@dabsi/typedi";

@Module({
  dependencies: [SystemStorageModule],
})
export default class SystemImageStorageModule {
  constructor(@Inject() dsm: SystemDataModule) {
    buildCountRefs(dsm, Image, "countRefs");
  }
}
