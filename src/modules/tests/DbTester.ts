import { WeakId } from "@dabsi/common/WeakId";
import { Tester } from "@dabsi/jasmine/Tester";
import DataModule from "@dabsi/modules/data";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import ModuleTester from "@dabsi/system/rich-text/tests/ModuleTester";
import { findEntities } from "@dabsi/typeorm/findEntities";

export default function DbTester(t: ReturnType<typeof ModuleTester>) {
  return Tester.beforeAll(() => {
    const dbModule = t.moduleRunner.getInstance(DbModule);
    const dataModule = t.moduleRunner.getInstance(DataModule);
    dbModule.connectionOptions = {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      logging: false,
      name: `tester-${WeakId(t)}`,
    };

    return {
      dbModule,
      addEntities(...entityTypes: Function[]) {
        dbModule.entityTypes.addAll(findEntities(entityTypes));
      },
      dataModule,
      data: t.moduleRunner.resolve(DataContext),
    };
  });
}
