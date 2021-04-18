import Lazy from "@dabsi/common/patterns/Lazy";
import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { ServerModule2 } from "@dabsi/modules2/ServerModule2";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import axios from "axios";

export type ServerModuleTester = ReturnType<typeof ServerModuleTester>;

let portCounter = 8877;

export function ServerModuleTester(t: ModuleTester) {
  return t.beforeAll(async t => {
    const port = portCounter++;

    const serverModule = await t.getAndWait(ServerModule2);

    await serverModule.start({
      disablePid: true,
      port,
    });

    return {
      moduleTester: t,
      serverModule,
      axios: axios.create({ baseURL: `http://localhost:` + port }),
    };
  });
}

ServerModuleTester.default = SingleCall(() =>
  ServerModuleTester(ModuleTester.default())
);
