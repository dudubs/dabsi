import { ReactElement } from "react";
import { View } from "../../react/view/View";
import { ViewState } from "../../react/view/ViewState";
import { ContextualRpcProps } from "../ContextualRpc";
import { RpcConnection } from "../Rpc";
import {
  AnyWidget,
  AnyWidgetConnection,
  TWidget,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "./Widget";

export type WidgetViewFn<T extends AnyWidget, P = {}> = (
  props: WidgetViewProps<RpcConnection<T>> & P
) => ReactElement;
export type WidgetViewProps<C extends AnyWidgetConnection> = {
  key?: string | number;

  connection: C;

  element: WidgetElement<C>;
};

export abstract class WidgetView<
  C extends AnyWidgetConnection,
  P extends WidgetViewProps<C> = WidgetViewProps<C>,
  T extends TWidget = WidgetType<C>
> extends View<P> {
  @ViewState("forceUpdateElement") _element: T["Element"];

  protected updateElement?(element: T["Element"]): void;

  get element(): T["Element"] {
    return this._element;
  }

  setElement(element: T["Element"]) {
    this._element = element;
  }

  get controller(): RpcConnection<WidgetController<C>> {
    return this.props.connection.controller;
  }

  get controllerProps(): RpcConnection<WidgetController<C>>["props"] {
    return this.props.connection.controller.props;
  }

  get connection(): C {
    return this.props.connection;
  }

  get connectionProps(): C["props"] {
    return this.props.connection.props;
  }

  constructor(props: P) {
    super(props);
    this._element = this.props.element;
    this.updateElement?.(this.props.element);
  }

  forceUpdateElement() {
    this.updateElement?.(this.element);
  }

  updateViewProps(prevProps: Readonly<P>, nextProps: Readonly<P>): void {
    if (nextProps.element !== prevProps.element) {
      this._element = nextProps.element;
    }
  }
}
