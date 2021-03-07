import { ConfigFactory } from "@dabsi/typerpc/ConfigFactory";
import { RpcHookHandler } from "@dabsi/typerpc/RpcHook";
import { AnyWidget } from "@dabsi/typerpc/widget/Widget";

export const WidgetWrapperHandler: RpcHookHandler<
  AnyWidget,
  ConfigFactory<object, [state: any]>
> = {
  symbol: Symbol("WidgetWrapper"),
  resolveHookConfig(config) {
    return [config, config.getWrapperElement];
  },
  mergeHookConfig: (prevHookConfig: ConfigFactory<object>, nextHookConfig) => {
    return async ($, state) => {
      return $({
        ...(<any>await ConfigFactory(prevHookConfig, [state])),
        ...(<any>await ConfigFactory(nextHookConfig, [state])),
      });
    };
  },
  installHook(handler, getWrapperElement) {
    const { getElement: originalGetElement } = handler;
    handler.getElement = async function (state) {
      return {
        ...(await originalGetElement.call(this, state)),
        ...(await ConfigFactory(getWrapperElement, [state])),
      };
    };
  },
};
