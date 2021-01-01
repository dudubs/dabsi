import buildCountRefs from "@dabsi/system/data/buildCountRefs";
import DataSystemModule from "@dabsi/system/data";
import StorageModule from "@dabsi/system/storage";
import { Image } from "@dabsi/system/storage/image/entities/Image";
import { Inject, Module } from "@dabsi/typedi";

@Module({
  dependencies: [StorageModule],
})
export default class ImageStorageModule {
  constructor(@Inject() dsm: DataSystemModule) {
    buildCountRefs(dsm, Image, "countRefs");
  }
}
