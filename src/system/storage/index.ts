import { Type } from "@dabsi/common/typings2/Type";
import { Cli } from "@dabsi/modules/Cli";
import DataModule from "@dabsi/modules/data";
import buildCountRefs from "@dabsi/modules/data/buildCountRefs";
import DataSourceFactroyResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { DbModule } from "@dabsi/modules/DbModule";
import { StorageFile } from "@dabsi/system/storage/entities/StorageFile";
import Storage from "@dabsi/system/storage/Storage";
import { DataRow } from "@dabsi/typedata/DataRow";
import {
  AnyResolverMap,
  Inject,
  Injectable,
  Module,
  Resolver,
  ResolverType,
} from "@dabsi/typedi";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";
DataSourceFactroyResolver;
@Injectable()
export class DataResolver {
  constructor(
    @Inject(DataSourceFactroyResolver)
    public getSource: ResolverType<typeof DataSourceFactroyResolver>,
    @Inject(c => c)
    protected context: AnyResolverMap
  ) {}

  getRow<T>(type: Type<T>): DataRow<T> | undefined {
    const typeToken = getTypeToken(type);
    const resolver = this.context[typeToken];
    if (resolver) {
      return Resolver.resolve(resolver, this.context);
    }
  }
}
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
