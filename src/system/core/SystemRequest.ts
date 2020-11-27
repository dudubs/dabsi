import { Resolver } from "../../typedi";
import { AnyResolverMap } from "../../typedi/resolvers/ObjectResolver";
import { AnyRpc, RpcUnresolvedConfig } from "../../typerpc/Rpc";
import { SystemModule } from "./SystemModule";

export class SystemRequest {
  constructor(
    protected mSystem: SystemModule,
    protected context: AnyResolverMap
  ) {}

  getUnresolvedConfig<T extends AnyRpc>(rpc: T): RpcUnresolvedConfig<T> {
    const configResolver = this.mSystem.getConfig(rpc);
    return Resolver.resolve(configResolver, this.context);
  }
}
