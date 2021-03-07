import React from "react";
import { Override } from "@dabsi/common/typings2/Override";
import { Renderer } from "@dabsi/view/react/renderer";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetView } from "@dabsi/typerpc/widget/WidgetView";
import {
  AnyWidgetConnection,
  WidgetElement,
  WidgetType,
} from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { AnyTabsWidget } from "@dabsi/typerpc/widget/tabs/rpc";

export type AnyTabsWidgetConnection = RpcConnection<AnyTabsWidget>;

export class TabsWidgetView<
  C extends AnyTabsWidgetConnection
> extends WidgetView<
  C,
  WidgetViewProps<C> & {
    children: Renderer<TabsWidgetView<C>>;
  }
> {
  @ViewState()
  protected _currentTabProps:
    | Override<WidgetViewProps<AnyWidgetConnection>, { key: string }>
    | undefined;

  get currentTabProps():
    | Override<WidgetViewProps<AnyWidgetConnection>, { key: string }>
    | undefined {
    return this._currentTabProps;
  }

  protected updateTabProps({ key, element }: { key: string; element: object }) {
    this._currentTabProps = {
      key,
      connection: this.connection.map[key],
      elementState:
        this.elementState?.currentTab?.key === key
          ? this.elementState.currentTab.state
          : undefined,
      onElementStateChange: state => {
        this.setElementState({
          ...this.elementState,
          currentTab: { key, state },
        });
      },
      element,
    };
  }

  protected updateElement(element: WidgetElement<C>) {
    if (element.current) {
      this.updateTabProps(element.current);
    }
  }

  async switchTo<K extends keyof C["map"]>(key: string & K) {
    this.setElementState({
      ...this.elementState,
      currentTab: { key, state: undefined },
    });
    this.updateTabProps({
      key,
      element: await this.connection.getTabElement(key),
    });
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}