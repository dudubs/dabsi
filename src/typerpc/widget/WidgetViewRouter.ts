import {ReactElement} from "react";
import {PromiseType} from "../../common/typings";
import {TReactRouter} from "../../typerouter/ReactRouter";
import {ReactRouterRouteProps} from "../../typerouter/ReactRouterLocation";
import {Router} from "../../typerouter/Router";
import {Page} from "../Page";
import {RpcConnection} from "../Rpc";
import {AnyWidget, WidgetConnection, WidgetElement, WidgetType} from "./Widget";

export type TWidgetViewRouter = TReactRouter & { routerType: typeof WidgetViewRouter };

export namespace WidgetViewRouter {

    export function renderPage<T extends TWidgetViewRouter,
        C extends RpcConnection<Page<AnyWidget>>>(
            this:Router<T>,
            getConnection: (
                params: T['params'],
                props: ReactRouterRouteProps<T>) => C,

            render: (
                props: ReactRouterRouteProps<T> & {
                    page: WidgetType<C>['SubElement'],
                    widget: {
                        connection:
                            RpcConnection<WidgetType<C>['SubWidget']>,
                        element:
                            WidgetType<WidgetType<C>['SubWidget']>['Element']
                    }
                }
            ) => ReactElement
    ): Router<T>  {

        return this.renderWidget(getConnection, props => {

            const {widget: {element: [page, element], connection}} = props;
            return render({
                ...props,
                page,
                widget: {element, connection: connection}
            })
        });
    }

    export function renderWidget<T extends TReactRouter, C extends RpcConnection<AnyWidget>>(
        this: Router<T>,
        getConnection: (
            params: T['params'],
            props: ReactRouterRouteProps<T>
        ) => C,
        render: (
            props: ReactRouterRouteProps<T> & {
                widget: {
                    connection: C
                    element: WidgetElement<C>,
                }
            }
        ) => ReactElement
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
