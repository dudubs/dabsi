import { Awaitable, Typing } from "../../../common/typings";
import { RpcUnresolvedConfig } from "../../Rpc";
import { RpcConfigHook } from "../../RpcConfigHook";
import { InlineWidget } from "../inline-widget/InlineWidget";
import { AnyWidget } from "../Widget";
import { PageHandler } from "./PageHandler";

export type PageElement = { title: string };

export type AnyPage = Page<AnyWidget>;

export type Page<T extends AnyWidget> = RpcConfigHook<{
  Target: InlineWidget.WithElement<T, PageElement>;
  Config: {
    getTitle: () => Awaitable<string>;
    targetConfig: RpcUnresolvedConfig<T>;
  };
}>;

export function Page<T extends AnyWidget>(target: T): Page<T> {
  return <any>RpcConfigHook<AnyPage>({
    target: InlineWidget({
      target,
      element: Typing<PageElement>(),
    }),
    handler: PageHandler,
  });
}
