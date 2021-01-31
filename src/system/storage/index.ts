import { Cli } from "@dabsi/modules/Cli";
import DataModule from "@dabsi/modules/data";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import Storage from "@dabsi/system/storage/Storage";
import { Inject, Module } from "@dabsi/typedi";

@Module({})
export default class StorageModule {
  constructor(
    dsm: DataModule,
    cli: Cli,
    data: DataContext,
    dbModule: DbModule,
    storage: Storage
  ) {
    cli.command("storage", cli => {
      cli.command("clean", cli =>
        cli.onRun(async () => {
          await dbModule.init();

          for await (const file of data.getSource(StorageFile).find()) {
            log.info(() => `deleting ${file.url}.`);

            const result = await storage.delete(file.url);
            switch (result) {
              case "DELETED":
                await file.delete();
                break;
              case "INVALID_URL":
                // skipping
                break;
              default:
                log.info(
                  () => `Cant delete file ${file.url} because: ${result}`
                );
            }
          }
        })
      );
    });
  }
}

// DataContext.getSource
// DataContext.getRow()
