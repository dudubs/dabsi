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
    const b = RpcNamespace();
    const c = RpcNamespace();
    const e = RpcNamespace();

    const af = RpcFn();
    const afc = a.register("af", af);

    const bf = RpcFn();
    const bfc = a.register("bf", bf);

    const bc = a.register("b", b);
    const cc = b.register("c", c);

    const m = RpcMap({
      e,
    });
    const mc = c.register("m", m);

    const mf = RpcFn();
    const mfc = e.register("mf", mf);

    const config: RpcUnresolvedConfig<RpcNamespace> = {
      getNamespaceConfig(rpc) {
        return configMap.get(rpc);
      },
    };

    a.configureRpcService(config);

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
