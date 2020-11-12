import Tab, { TabProps } from "@material-ui/core/Tab";
import Tabs, { TabsProps } from "@material-ui/core/Tabs";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { entries } from "../../../common/object/entries";
import { LangKey } from "../../../lang/LangKey";
import { Renderer } from "../../../react/renderer";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { mergeProps } from "../../../react/utils/mergeProps";
import { RpcConnection } from "../../../typerpc/Rpc";
import { AnyTabsWidget } from "../../../typerpc/widget/tabs-widget/TabsWidget";
import { TabsWidgetView } from "../../../typerpc/widget/tabs-widget/TabsWidgetView";
import { WidgetType } from "../../../typerpc/widget/Widget";
import { AnyWidgetRecord } from "../../../typerpc/widget/widget-map/WidgetMap";
import { WidgetViewProps } from "../../../typerpc/widget/WidgetView";
import { MuiIcon } from "../components/MuiIcon";

export type AnyTabsWidgetConnection = RpcConnection<AnyTabsWidget>;

export type RendererOrProps<T, P> = [Partial<T>, Renderer<P>] | Renderer<P>;

export function RendererOrProps<T, P>(
  rendererOrProps: RendererOrProps<T, P>
): [Partial<T>, Renderer<P>] {
  if (typeof rendererOrProps === "function") {
    return [{}, rendererOrProps];
  } else {
    return rendererOrProps;
  }
}

export declare namespace MuiTabsWidgetViewProps {
  export type Tab = {
    title: ReactNode;
    icon?: MuiIcon;
  };
}
export type MuiTabsWidgetViewProps<
  C extends AnyTabsWidgetConnection,
  T extends AnyWidgetRecord = WidgetType<C>["TabMap"]
> = WidgetViewProps<C> & {
  TabsProps?: TabsProps;

  TabProps?: TabProps;
  SelectedTabProps?: TabProps;

  renderTabPanel?: Renderer<{ children: ReactElement | undefined }>;

  tabs: {
    [K in keyof T]: RendererOrProps<
      MuiTabsWidgetViewProps.Tab,
      WidgetViewProps<RpcConnection<T[K]>>
    >;
  };
};

export function MuiTabsWidgetView<C extends AnyTabsWidgetConnection>({
  tabs: keyToTab,
  TabsProps,
  TabProps,
  SelectedTabProps,
  renderTabPanel,
  ...props
}: MuiTabsWidgetViewProps<C>) {
  return (
    <TabsWidgetView {...props}>
      {view => {
        const tabs: ReactElement[] = [];
        const { tabProps } = view;

        for (const [key, tab] of entries(keyToTab)) {
          const isSelected = tabProps?.key === key;
          const [tabRenderProps] = RendererOrProps(tab);
          tabs.push(
            <Tab
              key={key}
              {...TabProps}
              {...(isSelected ? SelectedTabProps : null)}
              label={<LangKey for={key}>{tabRenderProps.title}</LangKey>}
              value={key}
            />
          );
        }

        let tabContent: ReactElement | undefined = undefined;

        if (tabProps) {
          const tab = keyToTab[tabProps.key!];
          if (tab) {
            const [_, tabRenderer] = RendererOrProps(tab);
            tabContent = tabRenderer(tabProps);
          }
        }

        if (tabs.length === 1) return tabContent ?? EmptyFragment;

        return (
          <>
            <Tabs
              {...mergeProps(TabsProps, {
                onChange: (_, key) => view.switchTo(key),
              })}
              value={tabProps?.key}
            >
              {tabs}
            </Tabs>
            {renderTabPanel
              ? renderTabPanel({ children: tabContent })
              : tabContent}
          </>
        );
      }}
    </TabsWidgetView>
  );
}
