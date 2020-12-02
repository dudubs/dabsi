import { Call } from "../../common/typings2/Call";
import { RpcHookHandler } from "../RpcHook";
import { AnyWidget } from "./Widget";

export const WidgetExtraHandler: RpcHookHandler<AnyWidget> = {
  symbol: Symbol("WidgetExtra"),
  resolveConfig(config, getElement) {
    if (
      config &&
      typeof config === "object" &&
      typeof config.getExtraElement === "function"
    ) {
      return [
        config.targetConfig,
        async state => {
          return {
            ...(await getElement?.(state)),
            ...(await config.getExtraElement(state)),
          };
        },
      ];
    }
    return [config, getElement];
  },
  getHandler(handler, getElementConfig) {
    const { getElement } = handler;
    handler.getElement = async function (state) {
      return {
        ...(await (getElement.call as Call<typeof getElement>)(this, state)),
        extra: await getElementConfig(state),
      };
    };
  },
};
