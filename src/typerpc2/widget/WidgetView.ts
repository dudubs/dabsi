import { defined } from "@dabsi/common/object/defined";
import {
  AnyWidget,
  WidgetElement,
  WidgetState,
} from "@dabsi/typerpc2/widget/Widget";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import { View } from "@dabsi/view/react/component/View";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import { WSA_E_CANCELLED } from "node:constants";
import React from "react";

export interface WidgetViewProps<T extends AnyWidget> {
  key?: string | number;
  mapKey?: undefined | string;

  connection: T;

  element?: WidgetElement<T> | undefined;

  state?: WidgetState<T> | undefined;

  parent?: undefined | WidgetView<any>;
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

  get connection(): T {
    return this.props.connection;
  }

  setElement(element: WidgetElement<T>): void {
    this._element = element;
  }

  updateElement?(element: WidgetElement<T>): void;

  forceUpdateElement() {
    if (!this.isDidMount) return;
    if (!this._element) return;
    this.updateElement?.(this._element);
  }

  renderWidget(): React.ReactNode {
    if (typeof this.props.children === "function") {
      return this.props.children(this);
    }

    return React.createElement(
      React.Fragment,
      null,
      `No render for ${this.constructor.name}`
    );
  }

  renderView(): React.ReactNode {
    if (!this._element) {
      return EmptyFragment;
    }

    return this.renderWidget();
  }

  updateViewProps(prevProps: Readonly<P>, nextProps: Readonly<P>) {
    super.updateViewProps?.(prevProps, nextProps);
    console.log({
      prevElement: nextProps.element,
      thisType: this.constructor.name,
    });
    if (nextProps.element !== prevProps.element) {
      console.log({
        nextElement: nextProps.element,
      });

      this._element = nextProps.element;
    }
  }

  componentDidMount() {
    super.componentDidMount?.();
    if (!this.props.parent && !this.props.element) {
      this.connection.getElement().then(element => {
        console.log({ element });

        this.setElement(element);
      });
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount?.();
    if (!this.props.parent && !this._element) {
      this.reloadElement();
    }
  }

  async reloadElement() {
    this._element = await this.connection.getElement();
  }
}
