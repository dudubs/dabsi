import { Awaitable } from "../common/typings";
import { RpcConfig } from "./Rpc";
import { RpcConfigurator } from "./RpcConfigurator";
import { ElementWidget } from "./widget/ElementWidget";
import { AnyWidget } from "./widget/Widget";

export type PageElement = { title: string };

export type Page<T extends AnyWidget> = RpcConfigurator<
  ElementWidget<PageElement, T>,
  {
    getTitle: () => Awaitable<string>;
    targetConfig: RpcConfig<T>;
  }
>;

export function Page<T extends AnyWidget>(widget: T): Page<T> {
  return <any>(
    RpcConfigurator<Page<AnyWidget>>(
      ElementWidget<any>()(widget),
      (config) => ({
        getElement: async () => ({
          title: await config.getTitle(),
        }),
        targetConfig: config.targetConfig,
      })
    )
  );
}
