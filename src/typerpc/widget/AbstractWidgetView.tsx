import { View } from "@dabsi/react/view/View";
import { ViewState } from "@dabsi/react/view/ViewState";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import {
  AnyWidget,
  AnyWidgetConnection,
  Widget,
  WidgetElement,
  WidgetElementState,
  WidgetType,
} from "@dabsi/typerpc/widget/Widget";
import { WidgetView, WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";

export abstract class AbstractWidgetView<
    C extends AnyWidgetConnection,
    P extends WidgetViewProps<C> = WidgetViewProps<C>
  >
  extends View<P>
  implements WidgetView<C> {
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
