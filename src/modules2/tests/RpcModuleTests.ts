import { RpcConfigResolver } from "@dabsi/modules/rpc/configResolver";
import { RpcModuleTester } from "@dabsi/modules2/tests/RpcModuleTester";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

const t = RpcModuleTester.default();

it("expect to call rpc-fn.", async done => {
  const rpc = RpcFn();
  t.rpcModule.configure(
    RpcConfigResolver(rpc, {}, c => () => {
      done();
    })
  );
  await t.createConnection(rpc)();
});

it("expect to generate call rpc-fn", done => {
  const rpc = RpcMap({
    fn: RpcFn<(text: string) => void>(),
  });

  t.rpcModule.configure(
    RpcConfigResolver(rpc.at("fn"), {}, c => msg => {
      expect(msg).toEqual("hello");
      done();
    })
  );

  return t.createConnection(rpc).fn("hello");
});
