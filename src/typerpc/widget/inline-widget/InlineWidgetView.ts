import { ReactNode } from "react";
import { RpcConnection } from "../../Rpc";
import { AbstractWidgetView } from "../AbstractWidgetView";
import { AnyInlineWidget, TInlineWidget } from "./InlineWidget";
import { AnyWidget, WidgetType } from "../Widget";
import { WidgetViewProps } from "../WidgetView";

export class InlineWidgetView<
  C extends RpcConnection<AnyInlineWidget>,
  T extends TInlineWidget = WidgetType<C>["TInlineWidget"],
  Target extends AnyWidget = NonNullable<T["Target"]>
> extends AbstractWidgetView<
  C,
  WidgetViewProps<C> & {
    children(view: InlineWidgetView<C>): ReactNode;
  }
> {
  get targetProps(): WidgetViewProps<RpcConnection<Target>> {
    return {
      connection: this.connection.target!,
      element: this.element.target!,
    };
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
