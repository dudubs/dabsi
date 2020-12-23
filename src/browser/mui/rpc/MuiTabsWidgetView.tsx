import Tab, { TabProps } from "@material-ui/core/Tab";
import Tabs, { TabsProps } from "@material-ui/core/Tabs";
import React from "react";
import { ReactElement, ReactNode } from "react";
import { entries } from "@dabsi/common/object/entries";
import { keys } from "@dabsi/common/object/keys";
import LangKey from "@dabsi/lang/LangKey";
import { useEmitter } from "@dabsi/react/reactor/useEmitter";
import { Renderer } from "@dabsi/react/renderer";
import { EmptyFragment } from "@dabsi/react/utils/EmptyFragment";
import { mergeProps } from "@dabsi/react/utils/mergeProps";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { AnyTabsWidget } from "@dabsi/typerpc/widget/tabs-widget/TabsWidget";
import { TabsWidgetView } from "@dabsi/typerpc/widget/tabs-widget/TabsWidgetView";
import {
  AnyWidget,
  AnyWidgetConnection,
  WidgetType,
} from "@dabsi/typerpc/widget/Widget";
import { AnyWidgetRecord } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { MuiIcon } from "@dabsi/browser/mui/components/MuiIcon";

export type AnyTabsWidgetConnection = RpcConnection<AnyTabsWidget>;

export type OldRendererOrProps<T, P> = [Partial<T>, Renderer<P>] | Renderer<P>;

export type MuiTabViewProps<C extends AnyWidgetConnection> = {
  title?: ReactNode;
  icon?: MuiIcon;
  render?(props: WidgetViewProps<C>): ReactElement;
};

export type MuiTabsWidgetViewProps<
  C extends AnyTabsWidgetConnection
> = WidgetViewProps<C> & {
  TabsProps?: TabsProps;

  TabProps?: TabProps;
  SelectedTabProps?: TabProps;

  renderTabPanel?: Renderer<{ children: ReactElement | undefined }>;

  locationStateKey?: string;

  onTabChange?(key: string);

  tabs: {
    [K in keyof C["map"]]?:
      | MuiTabViewProps<RpcConnection<C["map"][K]>>
      | MuiTabViewProps<RpcConnection<C["map"][K]>>["render"];
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
              label={<LangKey token={tabKey}>{tabOptions?.title}</LangKey>}
              icon={MuiIcon(tabOptions?.icon)}
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
