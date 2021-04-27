import { isHandlerSide } from "@dabsi/typerpc2/isHandlerSide";

export * from "./decorators";
export * from "./Rpc";
export * from "./RpcNamespace";

if (isHandlerSide()) {
  eval("require")("./RpcNamespaceHandler.ts");
}
