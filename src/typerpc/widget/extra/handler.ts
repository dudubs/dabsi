import { Call } from "@dabsi/common/typings2/Call";
import { RpcHookHandler } from "@dabsi/typerpc/RpcHook";
import { AnyWidget } from "@dabsi/typerpc/widget/Widget";

export const WidgetExtraHandler: RpcHookHandler<AnyWidget> = {
  symbol: Symbol("WidgetExtra"),
  resolveHookConfig(config, getElement) {
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
  installHook(handler, getElementConfig) {
    const { getElement } = handler;
    handler.getElement = async function (state) {
      return {
        ...(await (getElement.call as Call<typeof getElement>)(this, state)),
        extra: await getElementConfig(state),
      };
    };
  },
};
