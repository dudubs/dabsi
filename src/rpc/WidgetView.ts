import {View} from "../react/view/View";
import {ViewState} from "../react/view/ViewState";
import {InputMap} from "./input/InputMap";
import {RpcConnection} from "./Rpc";
import {AnyWidget, WidgetElement} from "./Widget";

export type WidgetViewProps<T extends AnyWidget> = {

    connection: RpcConnection<T>

    element?: WidgetElement<T>


};


export abstract class WidgetView<T extends AnyWidget,
    P extends WidgetViewProps<T> = WidgetViewProps<T>>
    extends View<P> {


    @ViewState('forceUpdateElement') element: WidgetElement<T> | undefined;

    protected updateElement?(element: WidgetElement<T> | undefined): void;

    forceUpdateElement() {
        this.updateElement?.(this.element);
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<any>, nextContext: any): boolean {
        if (nextProps.element !== this.props.element) {
            this.element = nextProps.element;
            this.updateElement?.(nextProps.element);
            return true;
        }
        return true;
    }



}