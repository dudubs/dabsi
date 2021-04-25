import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcModuleTester } from "@dabsi/modules2/tests/RpcModuleTester";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";

const t = RpcModuleTester.default();

it("expect to call rpc-fn.", async done => {
  const rpc = RpcFn();
  t.module.configure(
    RpcResolver(rpc, {}, c => () => {
      done();
    })
  );
  await t.createConnection(rpc)();
});

it("expect to generate call rpc-fn", done => {
  const rpc = RpcMap({
    fn: RpcFn<(text: string) => void>(),
  });

  t.module.configure(
    RpcResolver(rpc.at("fn"), {}, c => msg => {
      expect(msg).toEqual("hello");
      done();
    })
  );

  return t.createConnection(rpc).fn("hello");
});
