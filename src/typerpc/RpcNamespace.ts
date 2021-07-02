import tryToRequire from "@dabsi/common/tryToRequest";
import { RpcContextual } from "@dabsi/typerpc2/decorators";
import isHandlingSide from "@dabsi/typerpc2/isHandlingSide";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";

@RpcWithConfig()
// "RpcNamespaceHandler"
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

  static nsBind(
    getPath: () => any[],
    command: RpcCommand,
    getRootRpcType: () => RpcType
  ) {
    this.nsGetPath = getPath;
    this.nsCommand = command;
    this.nsGetRootRpcType = getRootRpcType;
  }

  static register(propertyName?: string): (childRpcType: RpcType) => void;

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
      return (childRpcType: RpcType) => {
        const nsKey = propertyName || childRpcType.name;
        if (RpcNamespace.isPrototypeOf(childRpcType)) {
          const childNsType: typeof RpcNamespace = <any>childRpcType;
          childNsType.nsCommand = payload => this.nsCommand(payload);
          childNsType.nsGetPath = () => [...this.nsGetPath(), nsKey];
          childNsType.nsBind(
            () => [...this.nsGetPath(), nsKey],
            payload => this.nsCommand(payload),
            () => this.nsGetRootRpcType()
          );
        }
        this.register(nsKey, childRpcType);
      };
    }

    // register(rpcType): rpc
    RpcContextual(() => childRpcType!)(
      (this.prototype as any) as Rpc & Record<string, Rpc>,
      propertyName
    );

    // onBind(payload=> ...)
    const childRpc: Rpc = new childRpcType(
      () => [...this.nsGetPath(), propertyName],
      payload => this.nsCommand(payload),
      () => this.nsGetRootRpcType()
    );
    return <any>childRpc;
  }
}

if (isHandlingSide()) {
  tryToRequire("./RpcNamespaceHandler");
}
