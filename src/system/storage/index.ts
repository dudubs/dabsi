import DataModule from "@dabsi/modules/data";
import buildCountRefs from "@dabsi/modules/data/buildCountRefs";
import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import { Inject, Module } from "@dabsi/typedi";

@Module({})
export default class StorageModule {
  constructor(@Inject() dsm: DataModule) {
    buildCountRefs(dsm, StorageFile, "countRefs");
  }
}
