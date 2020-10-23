import { Awaitable } from "../../common/typings";
import { RpcConfigOld } from "./Old";
import { AnyWidget, WidgetElement, WidgetHook } from "../widget/Widget";

export type ElementWidget<E, T extends AnyWidget> = WidgetHook<
  T,
  {
    SubElement: E;
    SubWidget: T;

    Element: [E, WidgetElement<T>];

    Config: {
      getElement(): Awaitable<E>;
      targetConfig: RpcConfigOld<T>;
    };
  }
>;

// ContextualRpcHook()
export function ElementWidget<E>(): <T extends AnyWidget>(
  target: T
) => ElementWidget<E, T> {
  return target => {
    return Object.setPrototypeOf(
      {
        getContext(config) {
          const context = target.getContext.call(this, config.targetConfig);
          return Object.setPrototypeOf(
            {
              async getElement() {
                return [
                  await config.getElement(),
                  await context.getElement.call(this),
                ];
              },
            },
            context
          );
        },
      },
      target
    );
  };
}
