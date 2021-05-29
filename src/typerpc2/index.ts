import tryToRequire from "@dabsi/common/tryToRequest";
import isHandlingSide from "@dabsi/typerpc2/isHandlingSide";

export * from "./decorators";
export * from "./Rpc";
export * from "./RpcNamespace";

if (isHandlingSide()) {
  tryToRequire("./RpcNamespaceHandler");
}
