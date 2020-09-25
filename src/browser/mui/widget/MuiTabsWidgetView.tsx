import Tab, {TabProps} from "@material-ui/core/Tab";
import Tabs, {TabsProps} from "@material-ui/core/Tabs";
import * as React from "react"; import {ReactElement, ReactNode} from "react";
import {entries} from "../../../common/object/entries";
import {mapObjectToArray} from "../../../common/object/mapObjectToArray";
import {Renderer} from "../../../react/renderer";
import {EmptyFragment} from "../../../react/utils/EmptyFragment";
import {mergeProps} from "../../../react/utils/mergeProps";
import {RpcConnection} from "../../../typerpc/Rpc";
import {TabsWidget} from "../../../typerpc/widget/TabsWidget";
import {TabsWidgetView} from "../../../typerpc/widget/TabsWidgetView";
import {AnyWidget, WidgetType} from "../../../typerpc/widget/Widget";
import {AnyWidgetMap} from "../../../typerpc/widget/WidgetMap";
import {WidgetViewProps} from "../../../typerpc/widget/WidgetView";
import {LangKey} from "../form2/LangKey";
import {MuiIcon} from "../MuiIcon";

export type AnyTabsWidgetConnection = RpcConnection<TabsWidget<AnyWidgetMap>>;

export type RendererOrProps<T, P> = [Partial<T>, Renderer<P>] |
    Renderer<P>;

export function RendererOrProps<T, P>(
    rendererOrProps: RendererOrProps<T, P>
): [Partial<T>, Renderer<P>] {
    if (typeof rendererOrProps === "function") {
        return [{}, rendererOrProps]
    } else {
        return rendererOrProps
    }
}

export declare namespace MuiTabsWidgetViewProps {
    export type Tab = {
        title: ReactNode
        icon?: MuiIcon,

    };
}
export type MuiTabsWidgetViewProps<C extends AnyTabsWidgetConnection> =
    WidgetViewProps<C> & {

    TabsProps?: TabsProps;

    TabProps?: TabProps;
    SelectedTabProps?: TabProps;

    renderTabPanel?: Renderer<{ children: ReactElement | undefined }>;

    tabs: {
        [K in keyof WidgetType<C>['Tabs']]:
        RendererOrProps<MuiTabsWidgetViewProps.Tab, WidgetViewProps<RpcConnection<WidgetType<C>['Tabs'][K]>>>
    }
};


export function MuiTabsWidgetView<C extends AnyTabsWidgetConnection>
({
     tabs: keyToTab,
     TabsProps,
     TabProps,
     SelectedTabProps,
     renderTabPanel,
     ...props
 }: MuiTabsWidgetViewProps<C>) {
    return <TabsWidgetView  {...props}>
        {view => {


            const tabs: ReactElement[] = [];

            for (const [key, tab] of entries(keyToTab)) {
                const isSelected = view.currentTab?.key === key;
                const [tabProps] = RendererOrProps(tab);
                tabs.push(<Tab
                    key={key}
                    {...TabProps}
                    {...isSelected ? SelectedTabProps : null}
                    label={<LangKey for={key}>{tabProps.title}</LangKey>}
                    value={key}
                />)
;
            }

            let tabContent: ReactElement | undefined = undefined;

            const {currentTab} = view;
            if (currentTab) {

                const tab = keyToTab[currentTab.key];
                if (tab) {
                    const [_, tabRenderer] = RendererOrProps(tab);
                    tabContent = tabRenderer({
                        ...currentTab,
                        connection: view.props.connection.controller[currentTab.key]
                    })
                }
            }

            if(tabs.length===1)
                return tabContent??EmptyFragment


            return <>
                <Tabs {...mergeProps(TabsProps, {
                    onChange: (_, key) => view.switchTo(key)
                })}
                      value={currentTab?.key}>
                    {tabs}
                </Tabs>
                {renderTabPanel ? renderTabPanel({children: tabContent}) : tabContent}
            </>
        }}
    </TabsWidgetView>
}

