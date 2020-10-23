import { Awaitable, Typing } from "../../../common/typings";
import { NoRpc } from "../../NoRpc";
import { RpcUnresolvedConfig } from "../../Rpc";
import { RpcConfigHook, RpcConfigHookHandler } from "../../RpcConfigHook";
import { InlineWidget } from "../inline-widget/InlineWidget";
import { PageHandler } from "./PageHandler";
import { AnyWidget } from "../Widget";

export type PageElement = { title: string };

export type Page<T extends AnyWidget> = RpcConfigHook<{
  Target: InlineWidget<{
    Target: T;
    Controller: NoRpc;
    Element: PageElement;
  }>;
  Config: {
    getTitle: () => Awaitable<string>;
    targetConfig: RpcUnresolvedConfig<T>;
  };
}>;

export function Page<T extends AnyWidget>(target: T): Page<T> {
  return <any>RpcConfigHook<Page<AnyWidget>>({
    target: InlineWidget({
      target,
      element: Typing<PageElement>(),
    }),
    handler: PageHandler,
  });
}
