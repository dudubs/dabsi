import { RpcContextual } from "@dabsi/typerpc2/decorators";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";

export type RpcNamespace = BaseRpcNamespace;

@RpcWithConfig()
export class BaseRpcNamespace extends Rpc {
  static register<T extends Rpc>(name: string, rpcType: RpcType<T>): T;
  static register(name: string): typeof BaseRpcNamespace;
  static register(name, rpcType?) {
    if (rpcType) {
      RpcContextual(() => rpcType)(<any>this.prototype, name);
      return new rpcType([], async payload => {
        return this.command([name, ...payload]);
      });
    } else {
      const ns = RpcNamespace();

      Object.defineProperty(ns, "name", {
        value: name,
      });
      RpcContextual(() => ns)(<any>this.prototype, name);

      ns.command = payload => this.command([name, ...payload]);

      return ns;
    }
  }

  static command: RpcCommand = () => {
    throw new Error("No rpc command.");
  };
}

export function RpcNamespace(): typeof BaseRpcNamespace {
  return class RpcNamespace extends BaseRpcNamespace {};
}
