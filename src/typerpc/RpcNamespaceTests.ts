import { configureRpcService, RpcUnresolvedConfig } from "./Rpc";
import { RpcFn } from "./rpc-fn/RpcFn";
import { RpcMap } from "./rpc-map/RpcMap";
import { RpcNamespace } from "./RpcNamespace";

testm(__filename, () => {
  fit("", () => {
    console.log(
      [1, 2, 3, 4, 5, 6, 7]
        .toSeq()
        .reverse()
        .takeUntil(x => x == 2)
        .reverse()
        .filter(x => 5 >= x)
        .toArray()
    );
  });
  fit("", async () => {
    const a = RpcNamespace();
    const af = RpcFn();
    const afc = a.register("af", af);
    const b = RpcNamespace();
    const bf = RpcFn();
    const bfc = a.register("bf", bf);
    const c = RpcNamespace();
    const e = RpcNamespace();

    const bc = a.register("b", b);
    const cc = b.register("c", c);

    const m = RpcMap({
      n: e,
    });
    const mc = c.register("m", m);

    const mf = RpcFn();
    const mfc = e.register("mf", mf);

    const config: RpcUnresolvedConfig<RpcNamespace> = {
      getNamespaceConfig(rpc) {
        return configMap.get(rpc);
      },
    };

    configureRpcService(a, config);

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
        n: config,
      });

    expect(<any>await afc()).toEqual("AF");
    expect(<any>await bfc()).toEqual("BF");
    expect(<any>await mfc()).toEqual("MF");
  });
});
