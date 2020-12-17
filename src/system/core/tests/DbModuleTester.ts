import { Tester } from "@dabsi/jasmine/Tester";
import { DbModule } from "@dabsi/system/core/DbModule";
import { TestModule } from "@dabsi/system/core/tests/TestModule";

const TestDbModule = TestModule.resolve(DbModule);
TestDbModule.connectionOptions = {
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: false,
};

export const DbModuleTester = Tester.beforeAll({
  connection: async () => {
    await TestDbModule.init();
    return TestDbModule.getConnection();
  },
});
export function testDbModule() {}
