import {Awaitable} from "../common/typings";
import {ElementWidget} from "./ElementWidget";
import {RpcConfig} from "./Rpc";
import {AnyWidget} from "./Widget";
import {WidgetConfigurator} from "./WidgetConfigurator";
import {AnyWidgetMap, WidgetMap} from "./WidgetMap";


export type PageElement = { title: string };

export type Page<T extends AnyWidget> =
    WidgetConfigurator<{
        getTitle: () => Awaitable<string>,
        target: RpcConfig<T>
    }, ElementWidget<PageElement, T>>;


export function Page<T extends AnyWidget>(widget: T): Page<T> {
    return WidgetConfigurator(
        ElementWidget<{ title: string }>()<T>(widget),
        (config) => ({
            getElement: async () => ({
                title: await config.getTitle()
            }),
            target: null
        })
    );
}

export type PageMap<T extends AnyWidgetMap> = Page<WidgetMap<T>>;

export function PageMap<T extends AnyWidgetMap>(items: T): PageMap<T> {
    return Page(WidgetMap(items))
}
