import DataSystemModule from "@dabsi/system/data";
import buildCountRefs from "@dabsi/system/data/buildCountRefs";
import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import { Inject, Module } from "@dabsi/typedi";

@Module({})
export default class StorageModule {
  constructor(@Inject() dsm: DataSystemModule) {
    buildCountRefs(dsm, StorageFile, "countRefs");
  }
}
