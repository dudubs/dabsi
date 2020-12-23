import buildCountRefs from "@dabsi/system/core/buildCountRefs";
import DataSystemModule from "@dabsi/system/core/DataSystemModule";
import CoreStorageModule from "@dabsi/system/storage/core";
import { Inject, Module } from "@dabsi/typedi";
import { Image } from "./entities/Image";

@Module({
  dependencies: [CoreStorageModule],
})
export default class ImageStorageModule {
  constructor(@Inject() dsm: DataSystemModule) {
    buildCountRefs(dsm, Image, "countRefs");
  }
}
