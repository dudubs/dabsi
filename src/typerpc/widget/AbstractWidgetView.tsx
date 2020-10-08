import { View } from "../../react/view/View";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import {
  AnyWidgetConnection,
  TWidget,
  WidgetController,
  WidgetType,
} from "./Widget";
import { WidgetView, WidgetViewProps } from "./WidgetView";

export abstract class AbstractWidgetView<
    C extends AnyWidgetConnection,
    P extends WidgetViewProps<C> = WidgetViewProps<C>,
    T extends TWidget = WidgetType<C>
  >
  extends View<P>
  implements WidgetView<C> {
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
