import { RequestSession, SessionModule } from "@dabsi/modules/session";
import ExpressModule from "@dabsi/modules/ExpressModule";
import { DbModuleTester } from "@dabsi/modules/tests/testers/DbModuleTester";
import { ServerModuleTester } from "@dabsi/modules/tests/testers/ServerModuleTester";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import { resolveModuleName } from "typescript";

const mt = ModuleTester([
  SessionModule,
  Resolver([ExpressModule], em => {
    em.builders.push(app => {
      app.get("/test", (req, res) =>
        em.processRequest(mt.moduleRunner.context, req, res, async context => {
          const session = await Resolver.resolve(
            RequestSession,
            context
          ).fetch(["timeout"]);
          res.json({
            sessionKey: session.$key,
            sessionTimeout: session.timeout,
          });
        })
      );
    });
  }),
]);

const dbt = DbModuleTester(mt);

const st = ServerModuleTester(mt);

beforeAll(() => st.start());

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
