import { RpcCommand } from "@dabsi/old-typerpc/Rpc";
import {
  AnyWidget,
  TWidget,
  _WidgetConnection,
} from "@dabsi/old-typerpc/widget/Widget";

export class BaseWidgetConnection implements _WidgetConnection<TWidget> {
  constructor(
    public $widget: AnyWidget,
    public $path: any[],
    public $command: RpcCommand
  ) {}

  getElement(state) {
    return this.$command(this.$path, ["getElement", [state]]);
  }
}
