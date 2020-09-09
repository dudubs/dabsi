import {View} from "../../react/view/View";
import {ViewState} from "../../react/view/ViewState";
import {RpcConnection} from "../Rpc";
import {AnyWidget, TWidget, WidgetElement, WidgetType} from "./Widget";

export type WidgetViewProps<C extends RpcConnection<AnyWidget>> = {

    connection: C

    element?: WidgetElement<C>


};


export abstract class WidgetView<C extends RpcConnection<AnyWidget>,
    P extends WidgetViewProps<C> = WidgetViewProps<C>,
    T extends TWidget = WidgetType<C>>
    extends View<P> {


    // TODO: reloadElement

    @ViewState('forceUpdateElement') element: T['Element'] | undefined;

    protected updateElement?(element: T['Element'] | undefined): void;

    constructor(props: P) {
        super(props);

        this.element = props.element;
        this.updateElement?.(this.element)
    }


    forceUpdateElement() {
        this.updateElement?.(this.element);
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<any>, nextContext: any): boolean {
        if (nextProps.element !== this.props.element) {
            this.element = nextProps.element;
            this.updateElement?.(nextProps.element);
            return true;
        }
        // TODO: return true if didSetState
        return true;
    }


}
