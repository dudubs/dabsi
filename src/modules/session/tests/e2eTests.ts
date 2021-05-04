import { RequestSession, SessionModule } from "@dabsi/modules/session";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { DbModuleTester } from "@dabsi/modules2/tests/testers/DbModuleTester";
import { ServerModuleTester } from "@dabsi/modules2/tests/testers/ServerModuleTester";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";

const mt = ModuleTester([
  SessionModule,
  Resolver([ExpressModule2], em => {
    em.builders.push(app => {
      app.get(
        "/test",
        em.processRequest(
          mt.moduleRunner.context,
          async (req, res, context) => {
            const session = await Resolver.resolve(
              RequestSession,
              context
            ).fetch(["timeout"]);
            res.json({
              sessionKey: session.$key,
              sessionTimeout: session.timeout,
            });
          }
        )
      );
    });
  }),
]);
const dbt = DbModuleTester(mt);

const st = ServerModuleTester(mt);

it("expect to use exists session", async () => {
  const res = await st.axios.get("/test");

  const cookie = res.headers["set-cookie"]
    .map(cookie => cookie.split(";", 1)[0])
    .join(";");

  const newResData = await (
    await st.axios.get("/test", {
      headers: {
        Cookie: cookie,
      },
    })
  ).data;

  expect(newResData.sessionKey).toEqual(res.data.sessionKey);

  expect(res.data.sessionTimeout).toBeLessThan(newResData.sessionTimeout);
});

it("expect to create new session", async () => {
  expect(await (await st.axios.get("/test")).data.sessionKey).not.toEqual(
    await (await st.axios.get("/test")).data.sessionKey
  );
});
