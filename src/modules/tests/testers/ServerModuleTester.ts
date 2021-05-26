import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import ServerModule from "@dabsi/modules/ServerModule";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import axios from "axios";

export type ServerModuleTester = ReturnType<typeof ServerModuleTester>;

let portCounter = 8877;

export function ServerModuleTester(t: ModuleTester) {
  return t.beforeAll(async t => {
    const port = portCounter++;

    const serverModule = await t.getAndWait(ServerModule);

    return {
      moduleTester: t,
      serverModule,
      axios: axios.create({ baseURL: `http://localhost:` + port }),
      start: () =>
        serverModule.start({
          port,
        }),
    };
  });
}

ServerModuleTester.default = SingleCall(() =>
  ServerModuleTester(ModuleTester.default())
);
