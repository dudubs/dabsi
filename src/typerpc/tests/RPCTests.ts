import { Command } from "../Command";
import { RpcHandlerToExpressHandler } from "../RpcHandlerToExpressHandler";
import { Service } from "../Service";
import { ExpressTester } from "./ExpressTests";

//
testm(__filename, () => {
  const TestCommand = Command<(...args: [number, number]) => number>();

  const TestService = Service({ test: TestCommand });

  function fetchExpressTesterJson(payload) {
    return ExpressTester.fetchJSON(payload);
  }

  it("command", async () => {
    ExpressTester.setExpressHandler(
      RpcHandlerToExpressHandler(TestCommand.createRpcHandler((a, b) => a + b))
    );

    expect(
      await TestCommand.createRpcConnection(fetchExpressTesterJson)(1, 2)
    ).toEqual(3);
  });

  it("service", async () => {
    ExpressTester.setExpressHandler(
      RpcHandlerToExpressHandler(
        TestService.createRpcHandler({
          test: (a, b) => a + b,
        })
      )
    );

    expect(
      await TestService.createRpcConnection(fetchExpressTesterJson).test(1, 2)
    ).toEqual(3);
  });
});
