import React from "react";
import { Override } from "../../../common/typings2/Override";
import { Renderer } from "../../../react/renderer";
import { ViewState } from "../../../react/view/ViewState";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";
import { AnyWidget, AnyWidgetConnection, WidgetType } from "../Widget";
import { WidgetViewProps } from "../WidgetView";
import { AnyTabsWidget, TabsWidget } from "./TabsWidget";

export type AnyTabsWidgetConnection = RpcConnection<AnyTabsWidget>;

export class TabsWidgetView<
  C extends AnyTabsWidgetConnection
> extends AbstractWidgetView<
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
      connection: this.controller[key],
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

  protected updateElement(element: WidgetType<C>["Element"]) {
    if (element.current) {
      this.updateTabProps(element.current);
    }
  }

  async switchTo<K extends string & keyof WidgetType<C>["TabMap"]>(key: K) {
    this.setElementState({
      ...this.elementState,
      currentTab: { key, state: undefined },
    });
    this.updateTabProps({
      key,
      element: await this.props.connection.getTabElement(key),
    });
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
