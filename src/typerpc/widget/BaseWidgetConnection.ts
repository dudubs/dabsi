import { touchObject } from "../../common/object/touchObject";
import { RpcCommand } from "../Rpc";
import { _WidgetConnection, AnyWidget, TWidget } from "./Widget";

export class BaseWidgetConnection implements _WidgetConnection<TWidget> {
  constructor(
    public $widget: AnyWidget,
    public $path: any[],
    public $command: RpcCommand
  ) {}

  $childCommand(key: string, payload: any, path: any[] = []) {
    return this.$command(payload, [...this.$path, key, ...path]);
  }

  $widgetCommand(key, ...args) {
    return this.$command([], [key, args]);
  }

  $getWidgetCommand(key) {
    return (...args) => this.$command([], [key, args]);
  }

  getElement(state) {
    return this.$widgetCommand("getElement", state);
  }

  $getChildConnectionCache = {};

  $getCommand(key: string) {
    return (...args) => {
      return this.$command(this.$path, [key, ...args]);
    };
  }
  $getChildConnection(key: string) {
    return touchObject(this.$getChildConnectionCache, key, () => {
      this.$widget.children[key].createRpcConnection((childPath, payload) =>
        this.$command([...this.$path, key, ...childPath], payload)
      );
    });
  }
}
