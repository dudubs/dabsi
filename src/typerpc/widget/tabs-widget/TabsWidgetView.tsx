import React from "react";
import { Override } from "../../../common/typings2/Override";
import { Renderer } from "../../../react/renderer";
import { ViewState } from "../../../react/view/ViewState";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";
import { AnyWidgetConnection, WidgetElement, WidgetType } from "../Widget";
import { WidgetViewProps } from "../WidgetView";
import { AnyTabsWidget } from "./TabsWidget";

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
