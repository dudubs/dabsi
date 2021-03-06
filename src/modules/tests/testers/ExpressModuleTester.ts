import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Tester } from "@dabsi/jasmine/Tester";
import ExpressModule from "@dabsi/modules/ExpressModule";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import axios from "axios";

export function ExpressModuleTester(t: ModuleTester) {
  return Tester.beforeAll(async () => {
    const module = await t.getAndWait(ExpressModule);
    const app = module.createApplication();

    const server: ReturnType<typeof app.listen> = await new Promise(resolve => {
      const server = app.listen(() => {
        resolve(server);
      });
    });

    const { address: host, port } = server.address() as any;

    return {
      module,
      app,
      server,
      axios: axios.create({
        //
        baseURL: `http://[${host}]:${port}`,
      }),
    };
  });
}

ExpressModuleTester.default = SingleCall(() =>
  ExpressModuleTester(ModuleTester.default())
);
