import {Awaitable} from "../common/typings";
import {AfterMountView, View} from "../react/view/View";
import {ViewState} from "../react/view/ViewState";
import {RpcConnectionType} from "./Rpc";
import {AnyWidget, WidgetType} from "./Widget";

export type WidgetViewProps<T extends AnyWidget> = {

    connection: RpcConnectionType<T>

    element?: WidgetType<T>['Element']

    loadOnMount?: boolean;

};

export abstract class WidgetView<T extends AnyWidget,
    P extends WidgetViewProps<T>>
    extends View<P> {

    // protected abstract setElement(element: WidgetType<T>['Element'] | null): void;

    abstract createEmptyElement(): WidgetType<T>['Element'];


    @ViewState() element: WidgetType<T>['Element'] = this.createEmptyElement();

    @ViewState() isLoading = false;

    constructor(props) {
        super(props);
        this.setElement(this.props.element);
    }

    async componentDidMount() {
        super.componentDidMount();
        if (this.props.loadOnMount) {
            this.isLoading = true;
            this.setElement(await this.props.connection.getElement())
            this.isLoading = false;
        }
    }

}
