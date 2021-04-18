import { WeakId } from "@dabsi/common/WeakId";
import { Tester } from "@dabsi/jasmine/Tester";
import { DataSourceFactory2 } from "@dabsi/modules2/DataSourceFactory2";
import { DbModule2 } from "@dabsi/modules2/DbModule2";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";

export type DbModuleTester = ReturnType<typeof DbModuleTester>;

export function DbModuleTester(mt: ModuleTester) {
  return Tester.beforeAll(async t => {
    const module = await mt.getAndWait(DbModule2);
    module.connectionOptions = {
      type: "sqlite",
      database: ":memory:",
      name: `dbmt-${WeakId({})}`,
      synchronize: true,
      logging: false,
    };

    return {
      module,
      getDataSource: <DataSourceFactory2>(
        (entityType => mt.resolve(DataSourceFactory2)(entityType))
      ),
      wait() {
        mt.resolve(DataSourceFactory2);
        return mt.wait();
      },
    };
  });
}
