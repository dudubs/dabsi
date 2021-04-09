import Lazy from "@dabsi/common/patterns/Lazy";
import { Tester } from "@dabsi/jasmine/Tester";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import axios from "axios";

let portCounter = 7776;

export function ExpressModuleTester(t: ModuleTester) {
  return Tester.beforeAll(async () => {
    const module = await t.getAndWait(ExpressModule2);
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

ExpressModuleTester.default = Lazy(() =>
  ExpressModuleTester(ModuleTester.default())
);
