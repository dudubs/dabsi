import { Module, ResolverMap } from "@dabsi/typedi";
import RequestModule from "../../modules/RequestModule";
import RpcModule from "../../modules/rpc";
import SessionModule from "../../modules/session";
import { SystemRpc } from "./common/rpc";

@Module({
  dependencies: [SessionModule],
})
export default class SystemModule {
  log = log.get("SYSTEM");

  constructor(
    protected requestModule: RequestModule,
    protected rpcModule: RpcModule
  ) {}

  async check(context: ResolverMap) {
    this.log.trace(`Checking..`);
    this.rpcModule.check(SystemRpc, context);
  }
}
