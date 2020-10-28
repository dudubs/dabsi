import { View } from "../../react/view/View";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import {
  AnyWidget,
  AnyWidgetConnection,
  Widget,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "./Widget";
import { WidgetView, WidgetViewProps } from "./WidgetView";

export abstract class AbstractWidgetView<
    C extends AnyWidgetConnection,
    P extends WidgetViewProps<C> = WidgetViewProps<C>
  >
  extends View<P>
  implements WidgetView<C> {
  @ViewState("forceUpdateElement") _element: WidgetElement<C>;

  protected updateElement?(element: WidgetElement<C>): void;

  get element(): WidgetElement<C> {
    return this._element;
  }

  setElement(element: WidgetElement<C>) {
    this._element = element;
  }

  get rpc(): Widget<WidgetType<C>> {
    return this.props.connection.rpc as any;
  }

  get controller(): RpcConnection<WidgetController<C>> {
    return this.props.connection.controller;
  }

  get connection(): C {
    return this.props.connection;
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

export type WidgetViewClass<T extends AnyWidget> = new (
  props: WidgetViewProps<RpcConnection<T>>
) => AbstractWidgetView<RpcConnection<T>>;
