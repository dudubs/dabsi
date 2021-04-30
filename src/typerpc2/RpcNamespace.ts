import { RpcContextual } from "@dabsi/typerpc2/decorators";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";

export class RpcNamespace extends Rpc {
  static command: RpcCommand;

  static register(
    propertyName?: string
  ): (childRpcType: typeof RpcNamespace) => void;

  static register<T extends Rpc>(
    propertyName: string,
    childRpcType: RpcType<T>
  ): T;
  static register<T extends Rpc>(childRpcType: RpcType<T>): T;

  static register(propertyName, childRpcType?: RpcType) {
    if (typeof propertyName === "function") {
      childRpcType = propertyName;
      propertyName = childRpcType!.name;
    }
    if (!childRpcType) {
      return (nsType: typeof RpcNamespace) => {
        const nsKey = propertyName || nsType.name;
        nsType.command = payload => this.command([nsKey, ...payload]);
        this.register(nsKey, nsType);
      };
    }
    RpcContextual(() => childRpcType!)(
      (this.prototype as any) as Rpc & Record<string, Rpc>,
      propertyName
    );
    return new childRpcType([propertyName], payload => this.command(payload));
  }
}
