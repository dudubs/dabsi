import { Call } from "../../common/typings2/Call";
import { RpcHookHandler } from "../RpcHook";
import { AnyWidget } from "./Widget";

export const WidgetHookHandler: RpcHookHandler<AnyWidget> = {
  symbol: Symbol("WidgetHook"),
  resolveConfig(config, getElement) {
    if (
      config &&
      typeof config === "object" &&
      typeof config.getElement === "function"
    ) {
      return [
        config.targetConfig,
        async state => {
          return {
            ...(await getElement(state)),
            ...(await config.getElement(state)),
          };
        },
      ];
    }
    return [config, getElement];
  },
  getHandler(handler, getElementConfig) {
    const { getElement } = handler;
    handler.getElement = async function (state) {
      return [
        await getElementConfig(state),
        await (getElement.call as Call<typeof getElement>)(this, state),
      ];
    };
  },
};
