import axios from "axios";
import { AsyncProcess } from "@dabsi/common/async/AsyncProcess";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { ServerModule2 } from "@dabsi/modules2/ServerModule2";
import { Module } from "@dabsi/typemodule";
import { Module2Tester } from "@dabsi/typemodule/tests/tester";
import bodyParser from "body-parser";
import { RequestModule2 } from "@dabsi/modules2/RequestModule2";

const TESTING_PORT = 9999;
const TESTING_URL = `http://0.0.0.0:${TESTING_PORT}`;

@Module()
class TestExpressModule {
  constructor(
    public serverModule: ServerModule2,
    public expressModule: ExpressModule2,
    public process: AsyncProcess
  ) {
    expressModule.builders.push(app => {
      app.post("/hello", bodyParser.urlencoded(), (req, res) => {
        res.json({ hello: req.body.name });
      });
    });

    process.wait().then(() =>
      serverModule.start({
        port: TESTING_PORT,
        disablePid: true,
      })
    );
  }
}

const t = Module2Tester(TestExpressModule);

afterAll(async () => {
  await t.instance.serverModule.stop();
});

it("", async () => {
  expect(
    await axios
      .post(TESTING_URL + "/hello", { name: "world" })
      .then(x => x.data)
  ).toEqual({ hello: "world" });
});
