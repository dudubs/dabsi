import { defined } from "@dabsi/common/object/defined";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import {
  AnyWidget,
  WidgetElement,
  WidgetState,
} from "@dabsi/typerpc2/widget/Widget";
import EmptyFragment from "@dabsi/view/react/EmptyFragment";
import ViewLoader from "@dabsi/view/ViewLoader";
import { View } from "@dabsi/view/react/View";
import ViewContext from "@dabsi/view/react/ViewContext";
import ViewState from "@dabsi/view/react/ViewState";
import React from "react";

export interface WidgetViewProps<T extends AnyWidget> {
  key?: string | number;

  childKey?: undefined | string;

  index?: number;

  connection: T;

  element?: WidgetElement<T> | undefined;

  state?: WidgetState<T> | undefined;

  parent?: undefined | WidgetView<any>;
}

export class WidgetView<
  T extends AnyWidget,
  P extends WidgetViewProps<T> = WidgetViewProps<T>
> extends View<P & { renderWidget?(view: WidgetView<T>): React.ReactElement }> {
  @ViewState() protected _isDidUpdateElement = false;

  @ViewState("forceUpdateElement") private _element:
    | WidgetElement<T>
    | undefined = this.props.element;

  private _elementCallbacks: ((element: any) => void)[] | null = null;

  get element(): WidgetElement<T> {
    return defined(this._element, () => `No widget element`);
  }

  get hasElement() {
    return Boolean(this._element);
  }

  get connection(): T {
    return this.props.connection;
  }

  waitForElement(): Promise<WidgetElement<T>> {
    return new Promise(resolve => {
      if (this._element) {
        return resolve(this._element);
      }
      (this._elementCallbacks ||= []).push(resolve);
    });
  }

  setElement(element: WidgetElement<T>): void {
    this._element = element;
  }

  updateElement?(): void;

  get isDidUpdateElement(): boolean {
    return this._isDidUpdateElement;
  }

  forceUpdateElement() {
    if (!this._element) return;

    try {
      this.updateElement?.();

      const { _elementCallbacks } = this;
      this._elementCallbacks = null;

      _elementCallbacks?.forEach(callback => {
        callback(this._element);
      });
    } finally {
      this._isDidUpdateElement = true;
    }
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
    if (!this._element || !this._isDidUpdateElement) {
      return EmptyFragment;
    }

    return React.createElement(ViewContext.Provider, {
      entries: [[WidgetView, this]],
      children: this.renderWidget(),
    });
  }

  updateViewProps(prevProps: Readonly<P>, nextProps: Readonly<P>) {
    super.updateViewProps?.(prevProps, nextProps);

    if (nextProps.element !== prevProps.element) {
      this._element = nextProps.element;
    }
  }

  componentDidMount() {
    super.componentDidMount?.();
    if (!this.props.parent && !this.props.element) {
      this.loadElement();
    }
  }

  async loadElement(): Promise<void> {
    this._element = await this.connection.getElement();
  }
}

export default WidgetView;
