import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { ServerModule2 } from "@dabsi/modules/ServerModule2";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import axios from "axios";

export type ServerModuleTester = ReturnType<typeof ServerModuleTester>;

let portCounter = 8877;

export function ServerModuleTester(t: ModuleTester) {
  return t.beforeAll(async t => {
    const port = portCounter++;

    const serverModule = await t.getAndWait(ServerModule2);

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
