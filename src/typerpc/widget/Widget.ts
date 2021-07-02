import { RpcFuncational } from "@dabsi/typerpc/decorators";
import { Rpc } from "@dabsi/typerpc/Rpc";

export class Widget<Element, State = null> extends Rpc {
  @RpcFuncational()
  getElement!: (state?: State) => Promise<Element>;
}

export interface AnyWidget extends Widget<any, any> {}

export type InferredWidget<T extends AnyWidget> = T extends Widget<
  infer Element,
  infer State
>
  ? { Element: Element; State: State }
  : never;

export type WidgetElement<T extends AnyWidget> = InferredWidget<T>["Element"];

export type WidgetState<T extends AnyWidget> = InferredWidget<T>["State"];
