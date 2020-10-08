import React from "react";
import { Renderer } from "../../react/renderer";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { AbstractWidgetView } from "./AbstractWidgetView";
import { TabsWidget } from "./TabsWidget";
import { WidgetElement, WidgetType } from "./Widget";
import { AnyWidgetMap } from "./WidgetMap";
import { WidgetView, WidgetViewProps } from "./WidgetView";

export type AnyTabsWidgetConnection = RpcConnection<TabsWidget<AnyWidgetMap>>;

export class TabsWidgetView<
  C extends AnyTabsWidgetConnection
> extends AbstractWidgetView<
  C,
  WidgetViewProps<C> & {
    children: Renderer<TabsWidgetView<C>>;
  }
> {
  @ViewState() currentTab: { key: string; element: any } | undefined;

  protected updateElement(element: WidgetType<C>["Element"]) {
    this.currentTab = element.current;
  }

  async switchTo<K extends string & keyof WidgetType<C>["Tabs"]>(key: K) {
    this.currentTab = {
      key,
      element: await this.props.connection.getTab(key),
    };
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
