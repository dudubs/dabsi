import React from "react";
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
  protected _tabProps: WidgetViewProps<AnyWidgetConnection> | undefined;

  get tabProps(): WidgetViewProps<AnyWidgetConnection> | undefined {
    return this._tabProps;
  }

  protected updateTabProps({ key, element }: { key: string; element: object }) {
    this._tabProps = {
      key,
      connection: this.controller[key],
      element,
    };
  }

  protected updateElement(element: WidgetType<C>["Element"]) {
    if (element.current) this.updateTabProps(element.current);
  }

  async switchTo<K extends string & keyof WidgetType<C>["TabMap"]>(key: K) {
    this.updateTabProps({
      key,
      element: await this.props.connection.getTab(key),
    });
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}