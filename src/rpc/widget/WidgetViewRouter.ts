import {ReactElement} from "react";
import {PromiseType} from "../../common/typings";
import {TReactRouter} from "../../typed-router/ReactRouter";
import {ReactRouterRouteProps} from "../../typed-router/ReactRouterLocation";
import {Router} from "../../typed-router/Router";
import {Page} from "../Page";
import {AnyWidget, WidgetConnection, WidgetType} from "./Widget";

export type TWidgetViewRouter = TReactRouter & { routerType: typeof WidgetViewRouter };

export namespace WidgetViewRouter {


    export function renderPage<T extends TWidgetViewRouter,
        E extends AnyWidget,
        C extends WidgetConnection<WidgetType<Page<AnyWidget>>>>(
        this: Router<T>,
        getConnection: (
            params: T['params'],
            props: ReactRouterRouteProps<T>) => C,
        render: (
            props: ReactRouterRouteProps<T> & {
                page: PromiseType<ReturnType<C['getElement']>>[0],
                widget: {
                    connection: C['controller'],
                    element: PromiseType<ReturnType<C['getElement']>>[1]
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
