import { ReactNode } from "react";
import { View } from "@dabsi/view/react/component/View";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import {
  AnyWidgetConnection,
  WidgetElement,
} from "@dabsi/typerpc/widget/Widget";
import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";

export class WidgetViewLoader<C extends AnyWidgetConnection> extends View<
  {
    connection: C;

    children(props: WidgetViewProps<C>, view: WidgetViewLoader<C>): ReactNode;
  } & Partial<Pick<WidgetViewProps<C>, "elementState" | "onElementStateChange">>
> {
  @ViewState() isLoading = false;

  @ViewState() element!: WidgetElement<C> | undefined;

  @ViewState() error: any = undefined;

  async reload() {
    this.isLoading = true;
    try {
      this.element = await this.props.connection.getElement(
        this.props.elementState
      );
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
    if (this.error) throw this.error;
    if (this.element)
      return this.props.children(
        {
          element: this.element,
          elementState: this.props.elementState,
          onElementStateChange: this.props.onElementStateChange,
          connection: this.props.connection,
        },
        this
      );
  }
}
