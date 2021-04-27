import { RequestSession, SessionModule } from "@dabsi/modules/session";
import { ServerModule2 } from "@dabsi/modules2/ServerModule2";
import { DbModuleTester } from "@dabsi/modules2/tests/DbModuleTester";
import { ExpressModuleTester } from "@dabsi/modules2/tests/ExpressModuleTester";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";

const mt = ModuleTester({ dependencies: [SessionModule] });
const dbt = DbModuleTester(mt);
const et = ExpressModuleTester(mt);

beforeAll(async () => {
  et.app.get(
    "/test",
    et.module.processRequest(
      mt.moduleRunner.context,
      async (req, res, context) => {
        await res.json({
          sessionKey: Resolver.resolve(RequestSession, context).$key,
        });
      }
    )
  );
});

it("expect to remember session", async () => {
  const res = await et.axios.get("/test");
  const cookie = res.headers["set-cookie"]
    .map(cookie => cookie.split(";", 1)[0])
    .join(";");
  expect(
    await (
      await et.axios.get("/test", {
        headers: {
          Cookie: cookie,
        },
      })
    ).data.sessionKey
  ).toEqual(res.data.sessionKey);
});

it("expect to create new session", async () => {
  expect(await (await et.axios.get("/test")).data.sessionKey).not.toEqual(
    await (await et.axios.get("/test")).data.sessionKey
  );
});
