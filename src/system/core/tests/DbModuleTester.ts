import { Tester } from "../../../jasmine/Tester";
import { DbModule } from "../DbModule";
import { TestModule } from "./TestModule";

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
