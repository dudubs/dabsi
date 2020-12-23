import { DbModule } from "@dabsi/system/core/DbModule";
import { Inject, Module } from "@dabsi/typedi";

@Module()
export default class TestDbModule {
  constructor(@Inject() public dbm: DbModule) {
    dbm.connectionOptions = {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      logging: false,
    };
  }
}
