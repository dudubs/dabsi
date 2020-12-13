import { useMemo } from "react";
import { If } from "../../common/typings2/boolean";
import { Is } from "../../common/typings2/boolean/Is";
import { Renderer } from "./../../react/renderer";
import { AnyInputConnection } from "./../../typerpc/input/Input";
import { InputViewProps } from "./../../typerpc/input/InputView";
import { AnyWidgetConnection } from "./../../typerpc/widget/Widget";
import { WidgetViewProps } from "./../../typerpc/widget/WidgetView";
import { SystemView, SystemViewRendrerer } from "./SystemView";

export function useSystemView<C extends AnyInputConnection>(
  connection: C,
  renderer: SystemViewRendrerer<C["$widget"]>
): void;
export function useSystemView(connection, renderer): void {
  useMemo(() => {
    SystemView.register(connection, renderer);
  }, [connection]);
}

export default useSystemView;
