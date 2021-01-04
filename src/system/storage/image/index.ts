import buildCountRefs from "@dabsi/modules/data/buildCountRefs";
import DataModule from "@dabsi/modules/data";
import StorageModule from "@dabsi/system/storage";
import { Image } from "@dabsi/system/storage/image/entities/Image";
import { Inject, Module } from "@dabsi/typedi";

@Module({
  dependencies: [StorageModule],
})
export default class ImageStorageModule {
  constructor(@Inject() dsm: DataModule) {
    buildCountRefs(dsm, Image, "countRefs");
  }
}
