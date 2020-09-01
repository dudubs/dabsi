import {ReactElement} from "react";
import {AwaitableType, PromiseType} from "../common/typings";
import {EmptyFragment} from "../react/utils/EmptyFragment";
import {TReactRouter} from "../typed-router/ReactRouter";
import {ReactRouterRouteProps} from "../typed-router/ReactRouterLocation";
import {Router, RouterPlugin} from "../typed-router/Router";
import {Page, PageElement} from "./Page";
import {AnyWidget, BaseWidgetConnection, WidgetElement, WidgetType} from "./Widget";

export type TWidgetViewRouter = TReactRouter & { routerType: typeof WidgetViewRouter };

export namespace WidgetViewRouter {


    export function renderPage<T extends TWidgetViewRouter,
        E extends AnyWidget,
        C extends BaseWidgetConnection<WidgetType<Page<any>>>>(
        this: Router<T>,
        getConnection: (
            params: T['params'],
            props: ReactRouterRouteProps<T>) => C,
        render: (
            props: ReactRouterRouteProps<T> & {
                page:  PromiseType<ReturnType<C['getElement']>>[0],
                widget: {
                    connection: C['controller'],
                    element:  PromiseType<ReturnType<C['getElement']>>[1]
                }
            }
        ) => ReactElement
    ): Router<T> {

        return this.renderWidget(getConnection, props => {

            const {widget: {element: [page, element], connection}} = props;
            return render({
                ...props,
                page,
                widget: {element, connection}
            })
        });
    }

    export function renderWidget<T extends TReactRouter, C extends {
        getElement(): Promise<any>
    }>(
        this: Router<T>,
        getConnection: (
            params: T['params'],
            props: ReactRouterRouteProps<T>) => C,
        render: (props: ReactRouterRouteProps<T> & {
            widget: {
                connection: C
                element: PromiseType<ReturnType<C['getElement']>>,
            }
        }) => ReactElement
    ) {
        return this.loadAndRender(async props => {
            const connection = getConnection(props.location.params, props);
            const renderProps = {
                ...props, widget: {
                    connection,
                    element: await connection.getElement()
                }
            }
            return () => {
                return render(renderProps)
            }
        })
    }

}
