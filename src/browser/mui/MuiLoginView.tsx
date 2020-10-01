import { AnyLogin } from "../../acl/Login";
import { Defined } from "../../common/typings";
import { Renderer } from "../../react/renderer";
import { RpcConnection } from "../../typerpc/Rpc";
import { WidgetElement, WidgetType } from "../../typerpc/widget/Widget";
import { WidgetViewProps } from "../../typerpc/widget/WidgetView";

export function MuiLoginView<C extends RpcConnection<AnyLogin>>(
  props: WidgetViewProps<C> & {
    target: Renderer<{
      props: WidgetViewProps<RpcConnection<WidgetType<C>["Props"]["target"]>>;
      user: Defined<WidgetElement<C>["user"]>;
    }>;
  }
) {
  if (props.element.user) {
  }
}
