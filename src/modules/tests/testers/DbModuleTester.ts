import { WeakId } from "@dabsi/common/WeakId";
import { Tester } from "@dabsi/jasmine/Tester";
import { DataSourceFactory2 } from "@dabsi/modules/DataSourceFactory2";
import { DbModule2 } from "@dabsi/modules/DbModule2";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";

export type DbModuleTester = ReturnType<typeof DbModuleTester>;

export function DbModuleTester(mt: ModuleTester) {
  return Tester.beforeAll(async t => {
    const dbModule = await mt.getAndWait(DbModule2);
    dbModule.connectionOptions = {
      type: "sqlite",
      database: ":memory:",
      name: `dbmt-${WeakId({})}`,
      synchronize: true,
      logging: false,
    };

    return {
      dbModule,
      getDataSource: <DataSourceFactory2>(
        (entityType => mt.resolve(DataSourceFactory2)(entityType))
      ),
    };
  });
}
