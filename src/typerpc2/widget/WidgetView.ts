import { defined } from "@dabsi/common/object/defined";
import {
  AnyWidget,
  WidgetElement,
  WidgetState,
} from "@dabsi/typerpc2/widget/Widget";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import { View } from "@dabsi/view/react/component/View";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";

export interface WidgetViewProps<T extends AnyWidget> {
  widget: T;

  widgetKey: undefined | string;

  element: WidgetElement<T> | undefined;

  state: WidgetState<T> | undefined;

  parent: undefined | WidgetView<T>;

  onUpdateElement: undefined | ((view: WidgetView<T>) => void);

  onUpdateState: undefined | ((view: WidgetView<T>) => void);
}

export class WidgetView<
  T extends AnyWidget,
  P extends WidgetViewProps<T> = WidgetViewProps<T>
> extends View<P & { renderWidget?(view: WidgetView<T>): React.ReactElement }> {
  //
  @ViewState("forceUpdateElement") private _element:
    | WidgetElement<T>
    | undefined = this.props.element;

  get element(): WidgetElement<T> {
    return defined(this._element, () => `No widget element`);
  }

  get widget(): T {
    return this.props.widget;
  }

  setElement(element: WidgetElement<T>): void {
    this._element = element;
  }

  updateElement?(element: WidgetElement<T>): void;

  forceUpdateElement() {
    if (!this.isDidMount) return;
    if (!this._element) return;
    this.updateElement?.(this._element);
    if (this.isDidMount) {
      this.props.onUpdateElement?.(this);
    }
  }

  renderWidget(): React.ReactNode {
    if (this.props.renderWidget) {
      return this.props.renderWidget(this);
    }
    return React.createElement(
      React.Fragment,
      null,
      `No render for ${this.constructor.name}`
    );
  }

  renderView() {
    if (!this._element) {
      return EmptyFragment;
    }
    return this.renderWidget();
  }

  updateViewProps(prevProps: Readonly<P>, nextProps: Readonly<P>) {
    if (nextProps.element !== prevProps.element) {
      this._element = nextProps.element;
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount?.();
    if (!this.props.parent && !this._element) {
      this.reloadElement();
    }
  }

  async reloadElement() {
    this._element = await this.widget.getElement();
  }
}
