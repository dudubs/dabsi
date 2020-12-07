import { flat } from "../common/iterator/flat";
import { entries } from "../common/object/entries";
import { RpcUnresolvedConfig } from "./Rpc";
import { RpcFn } from "./rpc-fn/RpcFn";
import { RpcMap } from "./rpc-map/RpcMap";
import { RpcNamespace } from "./RpcNamespace";
import { RpcNamespaceHandler } from "./RpcNamespaceHandler";

testm(__filename, () => {
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
});
