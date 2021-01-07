import { Cli } from "@dabsi/modules/Cli";
import DataModule from "@dabsi/modules/data";
import buildCountRefs from "@dabsi/modules/data/buildCountRefs";
import { DbModule } from "@dabsi/modules/DbModule";
import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import Storage from "@dabsi/system/storage/Storage";
import { Inject, Module } from "@dabsi/typedi";
import { DataResolver } from "./DataResolver";

@Module({})
export default class StorageModule {
  constructor(
    @Inject() dsm: DataModule,
    @Inject() cli: Cli,
    @Inject() data: DataResolver,
    @Inject() dbModule: DbModule,
    @Inject() storage: Storage
  ) {
    buildCountRefs(dsm, StorageFile, "countRefs");
    cli.command("storage", cli => {
      cli.command("clean", cli =>
        cli.onRun(async () => {
          await dbModule.init();

          for await (const file of data
            .getSource(StorageFile)
            .filter({ countRefs: 0 })
            .find()) {
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

// DataResolver.getSource
// DataResolver.getRow()
