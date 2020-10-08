import { Command } from "../Command";
import { Service, useServiceConfig } from "../Service";
import { assertEvent } from "./assertEvent";

testm(__filename, () => {
  it("multiple connections to service", async () => {
    const MyService = Service({
      test: Command<() => number>(),
      subService: Service({
        test: Command<() => number>(),
      }),
    });

    const first = MyService.createRpcConnection(
      MyService.createRpcHandler({
        test: () => 1,
        subService: {
          test: () => 1,
        },
      })
    );

    const second = MyService.createRpcConnection(
      MyService.createRpcHandler({
        test: () => 2,
        subService: {
          test: () => 2,
        },
      })
    );

    expect(await first.test()).toEqual(1);
    expect(await second.test()).toEqual(2);
    expect(await first.subService.test()).toEqual(1);
    expect(await second.subService.test()).toEqual(2);
  });

  it("sanity", async () => {
    const TestService = Service({
      add: Command<(x, y) => any>(),
      sub: Command<(x, y) => any>(),
    });

    useServiceConfig(TestService, {
      add(x, y) {
        return x + y;
      },
      sub(x, y) {
        return x - y;
      },
    });

    expect(await TestService.add(1, 2)).toEqual(3);
    expect(await TestService.sub(3, 2)).toEqual(1);
  });
});
