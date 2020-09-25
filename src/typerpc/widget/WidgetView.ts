import { ReactElement } from "react";
import { View } from "../../react/view/View";
import { ViewState } from "../../react/view/ViewState";
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

  loadOnInit?: boolean;
};

export class WidgetViewError extends Error {}

export abstract class WidgetView<
  C extends AnyWidgetConnection,
  P extends WidgetViewProps<C> = WidgetViewProps<C>,
  T extends TWidget = WidgetType<C>
> extends View<P> {
  // TODO: reloadElement

  @ViewState("forceUpdateElement") element: T["Element"];

  protected updateElement?(element: T["Element"]): void;

  get controller(): RpcConnection<WidgetController<C>> {
    return this.props.connection.controller;
  }

  constructor(props: P) {
    super(props);
    if (!this.props.connection)
      throw new WidgetViewError(`Can't render WidgetView without connection`);
    this.element = this.props.element;
    this.updateElement?.(this.props.element);

    if (this.props.loadOnInit) {
      this.props.connection.getElement().then((element) => {
        this.element = element;
      });
    }
  }

  forceUpdateElement() {
    this.updateElement?.(this.element);
  }

  shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<any>,
    nextContext: any
  ): boolean {
    if (nextProps.element !== this.props.element) {
      this.element = nextProps.element;
      this.updateElement?.(nextProps.element);
      return true;
    }
    // TODO: return true if didSetState
    return true;
  }
}
