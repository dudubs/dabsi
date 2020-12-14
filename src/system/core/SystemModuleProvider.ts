import { Constructor } from "../../common/typings2/Constructor";
import { ModuleProvider } from "../../typedi";
import { Consumer } from "../../typedi/Consumer";
import { AnyRpc } from "../../typerpc/Rpc";
import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { ResolveError } from "./../../typedi/ResolveError";
import { AnyResolverMap } from "./../../typedi/resolvers/ObjectResolver";
import { SystemModule } from "./SystemModule";

export default function ({
  configs,
  contexts,
}: {
  configs?: RpcConfigResolver<AnyRpc>[];
  contexts?: {
    for: AnyRpc;
    resolve?: Constructor<any>[];
  }[];
}): ModuleProvider {
  return Consumer([SystemModule], systemModule => {
    configs?.forEach(config => {
      systemModule.configureRpcResolver(config);
    });
    contexts?.forEach(({ for: rpc, resolve }) => {
      resolve?.forEach(type => {
        systemModule.configureRpcChildContext(
          rpc,
          type.provide(() => {
            throw new ResolveError(`No resolver for "${type.name}".`);
          })
        );
      });
    });

    return {};
  });
}
