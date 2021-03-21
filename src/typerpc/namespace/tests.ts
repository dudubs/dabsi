import { RpcNamespace } from "@dabsi/typerpc/namespace/rpc";
import { RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";

it("sanity", async () => {
  const a = RpcNamespace();
  const [af, afc] = a.register("af", RpcFn());
  const [bf, bfc] = a.register("bf", RpcFn());
  const [b, bc] = a.register("b", RpcNamespace());
  const [c, cc] = b.register("c", RpcNamespace());

  const e = RpcNamespace();
  const [m, mc] = c.register(
    "m",
    RpcMap({
      e,
    })
  );
  const [mf, mfc] = e.register("mf", RpcFn());

  const config: RpcUnresolvedConfig<RpcNamespace> = {
    getNamespaceConfig(rpc) {
      return configMap.get(rpc);
    },
  };

  a.configureRpc(config);

  const configMap = new Map()
    .set(a, config)
    .set(b, config)
    .set(c, config)
    .set(mf, () => {
      return "MF";
    })
    .set(bf, () => {
      return "BF";
    })
    .set(af, () => {
      return "AF";
    })
    .set(m, {
      e: config,
    });

  expect(<any>await afc()).toEqual("AF");
  expect(<any>await bfc()).toEqual("BF");
  expect(<any>await mfc()).toEqual("MF");
});
