import { WeakId } from "@dabsi/common/WeakId";
import { DbModule } from "@dabsi/modules/DbModule";
import { Inject, Module } from "@dabsi/typedi";

@Module()
export default class TestDbModule {
  constructor(@Inject() public dbm: DbModule) {
    dbm.connectionOptions = {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      logging: false,
      name: `TestDbModule_${WeakId(this)}`,
    };
  }
}
