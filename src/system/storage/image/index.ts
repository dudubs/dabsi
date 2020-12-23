import DataSystemModule from "@dabsi/system/core/DataSystemModule";
import { DbModule } from "@dabsi/system/core/DbModule";
import CoreStorageModule from "@dabsi/system/storage/core";
import { Inject, Module } from "@dabsi/typedi";
import { Image } from "./entities/Image";

@Module({
  dependencies: [CoreStorageModule],
})
export default class ImageStorageModule {
  constructor(@Inject() dsm: DataSystemModule, @Inject() dbm: DbModule) {
    dsm.buildCountRef(Image, "countRefs");
  }
}
