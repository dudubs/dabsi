import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetElement, WidgetType } from "@dabsi/typerpc/widget/Widget";
import { WidgetView, WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
import { AnyWidgetWrapper } from "@dabsi/typerpc/widget/wrapper/rpc";

export class WidgetWrapperView<
  C extends RpcConnection<AnyWidgetWrapper>
> extends WidgetView<
  C,
  WidgetViewProps<C> & {
    children: (
      props: WidgetViewProps<
        RpcConnection<WidgetType<C>["TWidgetWrapper"]["Target"]>
      >,
      element: WidgetElement<C>
    ) => React.ReactElement;
  }
> {
  renderView() {
    return this.props.children(
      {
        element: this.element.target,
        connection: this.connection,
        elementState: this.elementState,
        onElementStateChange: this.props.onElementStateChange,
      },
      this.element
    );
  }
}
