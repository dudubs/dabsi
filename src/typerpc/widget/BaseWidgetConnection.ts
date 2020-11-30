import { touchObject } from "../../common/object/touchObject";
import { RpcCommand } from "../Rpc";
import { _WidgetConnection, AnyWidget, TWidget } from "./Widget";

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
