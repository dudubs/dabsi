import {ReactElement} from "react";
import {View} from "../../react/view/View";
import {ViewState} from "../../react/view/ViewState";
import {RpcConnection} from "../Rpc";
import {AnyWidget, WidgetElement} from "./Widget";
import {WidgetView, WidgetViewProps} from "./WidgetView";

export class WidgetViewLoader<C extends RpcConnection<AnyWidget>>
    extends View<{

        connection: C;
        renderProgress?:()=>ReactElement;
        children(props: WidgetViewProps<C>, loader: WidgetViewLoader<C>):
            ReactElement
    }> {


    @ViewState() isLoading = false;

    @ViewState() element: WidgetElement<C> | undefined;
    @ViewState() error: any = undefined;

    async reload() {
        this.isLoading = true;
        try {
            this.element = await this.props.connection.getElement();
        } finally {
            this.isLoading = false;
        }
    }

    constructor(props) {
        super(props);

        this.reload().catch(error => {
            this.error = error;
        });
    }

    renderView(): React.ReactNode {
        if(this.error)
            throw this.error;
        if(this.isLoading && this.props.renderProgress)
            return this.props.renderProgress();
        return this.props.children({
            element: this.element!,
            connection: this.props.connection,
        }, this);
    }

}
