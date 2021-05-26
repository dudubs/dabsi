import { DataSourceFactory2 } from "@dabsi/modules/DbModule";
import DbModule from "@dabsi/modules/DbModule";
import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import { Storage, StorageDeleteResult } from "@dabsi/system/storage/Storage";
import { CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";

@Module({
  dependencies: [DbModule],
})
export default class StorageModule {
  @CliCommand("storage.clean")
  async clean(getDataSource: DataSourceFactory2, storage: Storage) {
    for await (const file of getDataSource(StorageFile).find()) {
      const result = await storage.delete(file.url);
      switch (result) {
        case StorageDeleteResult.DELETED:
          await file.delete();
          break;
        case StorageDeleteResult.INVALID_URL:
          // skipping
          break;
        default:
          log.info(() => `Cant delete file ${file.url} because: ${result}`);
      }
    }
  }
}

// DataContext.getSource
// DataContext.getRow()
