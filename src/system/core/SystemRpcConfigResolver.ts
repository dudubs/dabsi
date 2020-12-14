import { RpcUnresolvedConfig } from "../../typerpc/Rpc";
import { CustomResolver } from "../../typedi/Resolver";
import { AnyResolverMap } from "../../typedi/resolvers/ObjectResolver";
import { Consumer } from "../../typedi/Consumer";
import { SystemModule } from "./SystemModule";
import { AnyRpc } from "../../typerpc/Rpc";

export default function (): CustomResolver<
  <T extends AnyRpc>(rpc: T, context: AnyResolverMap) => RpcUnresolvedConfig<T>
> {
  return Consumer(
    [SystemModule, c => c],
    (systemModule, context) => (rpc, nextContext: AnyResolverMap) => {
      return systemModule.resolveRpcConfig(
        rpc,
        Object.setPrototypeOf({ ...nextContext }, context)
      );
    }
  );
}
