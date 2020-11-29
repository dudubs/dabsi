import Tab, { TabProps } from "@material-ui/core/Tab";
import Tabs, { TabsProps } from "@material-ui/core/Tabs";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { entries } from "../../../common/object/entries";
import { keys } from "../../../common/object/keys";
import { LangKey } from "../../../lang/LangKey";
import { useEmitter } from "../../../react/reactor/useEmitter";
import { Renderer } from "../../../react/renderer";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { mergeProps } from "../../../react/utils/mergeProps";
import { RpcConnection } from "../../../typerpc/Rpc";
import { AnyTabsWidget } from "../../../typerpc/widget/tabs-widget/TabsWidget";
import { TabsWidgetView } from "../../../typerpc/widget/tabs-widget/TabsWidgetView";
import {
  AnyWidget,
  AnyWidgetConnection,
  WidgetType,
} from "../../../typerpc/widget/Widget";
import { AnyWidgetRecord } from "../../../typerpc/widget/widget-map/WidgetMap";
import { WidgetViewProps } from "../../../typerpc/widget/WidgetView";
import { MuiIcon } from "../components/MuiIcon";

export type AnyTabsWidgetConnection = RpcConnection<AnyTabsWidget>;

export type RendererOrProps<T, P> = [Partial<T>, Renderer<P>] | Renderer<P>;

export type MuiTabViewProps<C extends AnyWidgetConnection> = {
  title?: ReactNode;
  icon?: MuiIcon;
  render?(props: WidgetViewProps<C>): ReactElement;
};

export type MuiTabsWidgetViewProps<
  C extends AnyTabsWidgetConnection,
  T extends AnyWidgetRecord = WidgetType<C>["TabMap"]
> = WidgetViewProps<C> & {
  TabsProps?: TabsProps;

  TabProps?: TabProps;
  SelectedTabProps?: TabProps;

  renderTabPanel?: Renderer<{ children: ReactElement | undefined }>;

  locationStateKey?: string;

  onTabChange?(key: string);

  tabs: {
    [K in keyof T]?:
      | MuiTabViewProps<RpcConnection<T[K]>>
      | MuiTabViewProps<RpcConnection<T[K]>>["render"];
  };
};

export function MuiTabsWidgetView<C extends AnyTabsWidgetConnection>(
  props: MuiTabsWidgetViewProps<C>
) {
  const {
    tabs: tabOptionsMap,
    TabsProps,
    TabProps,
    SelectedTabProps,
    renderTabPanel,
    ...otherProps
  } = props as MuiTabsWidgetViewProps<AnyTabsWidgetConnection>;
  const emit = useEmitter();

  return (
    <TabsWidgetView {...otherProps}>
      {view => {
        const tabs: ReactElement[] = [];
        const { currentTabProps } = view;
        const currentTabOptions =
          currentTabProps && getTabOptions(currentTabProps.key);

        for (const tabKey of keys(
          props.connection.$widget.children.map.children
        )) {
          const tabOptions = getTabOptions(tabKey);

          const isSelected = currentTabProps?.key === tabKey;

          tabs.push(
            <Tab
              key={tabKey}
              {...TabProps}
              {...(isSelected ? SelectedTabProps : null)}
              label={<LangKey for={tabKey}>{tabOptions?.title}</LangKey>}
              value={tabKey}
            />
          );
        }

        let tabContent: ReactElement | undefined = undefined;

        if (currentTabOptions?.render) {
          tabContent = currentTabOptions.render?.(currentTabProps!);
        }

        if (tabs.length === 1) return tabContent ?? EmptyFragment;

        return (
          <>
            <Tabs
              {...mergeProps(TabsProps, {
                onChange: (_, key) => {
                  props.onTabChange?.(key);
                  return view.switchTo(key);
                },
              })}
              value={currentTabProps?.key}
            >
              {tabs}
            </Tabs>
            {renderTabPanel
              ? renderTabPanel({ children: tabContent })
              : tabContent}
          </>
        );

        function getTabOptions(key: string) {
          if (tabOptionsMap)
            return (typeof tabOptionsMap[key] === "function"
              ? { render: tabOptionsMap[key] }
              : tabOptionsMap[key]) as
              | MuiTabViewProps<AnyWidgetConnection>
              | undefined;
        }
      }}
    </TabsWidgetView>
  );
}

export class LocationState {
  constructor(public key: string, public value: any) {}
}
