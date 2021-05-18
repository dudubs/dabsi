import { defined } from "@dabsi/common/object/defined";
import {
  AnyWidget,
  WidgetElement,
  WidgetState,
} from "@dabsi/typerpc2/widget/Widget";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import { View } from "@dabsi/view/react/component/View";
import { ReactContext } from "@dabsi/view/react/ReactContext";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import { WSA_E_CANCELLED } from "node:constants";
import React from "react";

export interface WidgetViewProps<T extends AnyWidget> {
  key?: string | number;

  childKey?: undefined | string;

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

  private _isUpdatingElement = false;

  get isUpdatingElement(): boolean {
    return this._isUpdatingElement;
  }

  @ViewState() protected _isDidUpdatingElement = false;

  forceUpdateElement() {
    if (!this.isDidMount) return;
    if (!this._element) return;
    this._isUpdatingElement = true;
    try {
      this.updateElement?.();

      const { _elementCallbacks } = this;
      this._elementCallbacks = null;

      _elementCallbacks?.forEach(callback => {
        callback(this._element);
      });
    } finally {
      this._isUpdatingElement = false;
      this._isDidUpdatingElement = true;
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
    if (!this._element || !this._isDidUpdatingElement) {
      return EmptyFragment;
    }

    return React.createElement(ReactContext.Provider, {
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
      this.reloadElement();
    }
  }

  async reloadElement() {
    this._element = await this.connection.getElement();
  }
}
