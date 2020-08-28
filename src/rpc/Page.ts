import {Awaitable} from "../common/typings";
import {AnyWidget, BaseWidgetProps, TBaseWidet, Widget, WidgetType} from "./Widget";

export type Page<T extends AnyWidget> = Widget<TBaseWidet & {
    Config: {
        getTitle(): Awaitable<string>
        widget: WidgetType<T>['Config']
    }
    Static: { widget: T }
    Element: {
        title: string;
        widget: WidgetType<T>['Element']
    }
    Controller: T
}>;


export function Page<T extends AnyWidget>(
    widget: T
): Page<T> {
    return Widget({
        ...BaseWidgetProps,
        controller: widget,
        static: {widget},
        createContext: config => {
            return {
                getControllerConfig: () => config.widget,
                getElement: async () => {
                    return {
                        title: await config.getTitle(),
                        widget: await widget
                            .getContext(config.widget)
                            .getElement()
                    }
                }
            }
        }
    })
}


