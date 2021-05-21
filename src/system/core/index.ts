import { RpcModule2 } from "@dabsi/modules/rpc";
import { SessionModule } from "@dabsi/modules/session";
import { RequestBuilder } from "@dabsi/modules/RequestBuilder";
import { ResolverMap } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import SystemRpc, { SYSTEM_RPC_PATH } from "./common/rpc";

@Module({
  dependencies: [SessionModule],
})
export class SystemModule {
  readonly log = log.get("SYSTEM");

  readonly request = new RequestBuilder();

  constructor(protected rpcModule: RpcModule2) {}

  async check(context: ResolverMap) {
    this.log.trace(`Checking..`);
    this.rpcModule.check(SystemRpc, context);
  }

  installServer(@Plugin() rpcModule: RpcModule2) {
    rpcModule.serve(SYSTEM_RPC_PATH, SystemRpc);
  }
}
