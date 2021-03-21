import { View } from "@dabsi/view/react/component/View";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import {
  AnyWidget,
  AnyWidgetConnection,
  WidgetElement,
  WidgetElementState,
} from "@dabsi/typerpc/widget/Widget";
import { ReactElement } from "react";

export type WidgetViewRenderer<T extends AnyWidget, P = {}> = (
  props: WidgetViewProps<RpcConnection<T>> & P
) => ReactElement;

export interface WidgetViewProps<C extends AnyWidgetConnection> {
  key?: string | number;

  mapKey?: string;

  connection: C;

  element: WidgetElement<C>;

  elementState: WidgetElementState<C> | undefined;

  onElementChange?(view: WidgetView<C>);

  onElementStateChange: ((state: WidgetElementState<C>) => void) | undefined;
}

export class WidgetView<
  C extends AnyWidgetConnection,
  P extends WidgetViewProps<C> = WidgetViewProps<C>
> extends View<
  P & {
    render?(view: WidgetView<C>);
  }
> {
  @ViewState("forceUpdateElement") _element!: WidgetElement<C>;

  protected updateElement?(element: WidgetElement<C>): void;

  protected _elementState: WidgetElementState<C> | undefined = this.props
    .elementState;

  setElementState(state: WidgetElementState<C>) {
    this.props.onElementStateChange?.((this._elementState = state));
  }

  get elementState(): WidgetElementState<C> | undefined {
    return this._elementState;
  }

  get element(): WidgetElement<C> {
    return this._element;
  }

  setElement(element: WidgetElement<C>) {
    this._element = element;
  }

  get connection(): C {
    return this.props.connection;
  }

  render() {
    if (!this.isDidMount) {
      this._element = this.props.element;
      this.updateElement?.(this.props.element);
    }
    return super.render();
  }

  renderView() {
    return this.props.render?.(this);
  }

  forceUpdateElement() {
    this.updateElement?.(this.element);
    if (this.isDidMount) {
      this.props.onElementChange?.(this);
    }
  }

  updateViewProps(prevProps: Readonly<P>, nextProps: Readonly<P>): void {
    if (nextProps.element !== prevProps.element) {
      this._element = nextProps.element;
    }
  }
}

export type WidgetViewClass<T extends AnyWidget> = new (
  props: WidgetViewProps<RpcConnection<T>>
) => WidgetView<RpcConnection<T>>;
