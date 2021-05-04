import { RpcContextual } from "@dabsi/typerpc2/decorators";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";

export class RpcNamespace extends Rpc {
  static nsCommand: RpcCommand = function (this: Function) {
    throw new Error(`No ns-command for ${this.name}.`);
  };

  static nsGetPath: () => any[] = function (this: Function) {
    throw new Error(`No ns-path for ${this.name}.`);
  };

  static nsGetRootRpcType: () => RpcType = function (this: RpcType): RpcType {
    return this;
  };

  static bind(
    getPath: () => any[],
    command: RpcCommand,
    getRootRpcType: () => RpcType
  ) {
    this.nsGetPath = getPath;
    this.nsCommand = command;
    this.nsGetRootRpcType = getRootRpcType;
  }

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
      // register(propertyName?): class-decorator
      return (nsType: typeof RpcNamespace) => {
        const nsKey = propertyName || nsType.name;
        nsType.nsCommand = payload => this.nsCommand(payload);
        nsType.nsGetPath = () => [...this.nsGetPath(), nsKey];
        nsType.bind(
          () => [...this.nsGetPath(), nsKey],
          payload => this.nsCommand(payload),
          () => this.nsGetRootRpcType()
        );
        this.register(nsKey, nsType);
      };
    }

    // register(rpcType): rpc
    RpcContextual(() => childRpcType!)(
      (this.prototype as any) as Rpc & Record<string, Rpc>,
      propertyName
    );

    // onBind(payload=> ...)
    return new childRpcType(
      () => [...this.nsGetPath(), propertyName],
      payload => this.nsCommand(payload),
      () => this.nsGetRootRpcType()
    );
  }
}
