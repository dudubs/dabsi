import { ReactElement, ReactNode } from "react";
import { View } from "../../react/view/View";
import { ViewState } from "../../react/view/ViewState";
import { RpcConnection } from "../Rpc";
import { AnyWidget, AnyWidgetConnection, WidgetElement } from "./Widget";
import { WidgetView, WidgetViewProps } from "./WidgetView";

export class WidgetViewLoader<C extends AnyWidgetConnection> extends View<{
  connection: C;

  children(
    props: WidgetViewProps<C> | undefined,
    view: Readonly<WidgetViewLoader<C>>
  ): ReactNode;
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

    this.reload().catch((error) => {
      this.error = error;
    });
  }

  renderView(): React.ReactNode {
    if (this.error) throw this.error;
    return this.props.children(
      this.element && {
        element: this.element,
        connection: this.props.connection,
      },
      this
    );
  }
}
