import { useMemo } from "react";
import { If } from "../../common/typings2/boolean";
import { Is } from "../../common/typings2/boolean/Is";
import { Renderer } from "./../../react/renderer";
import { AnyInputConnection } from "./../../typerpc/input/Input";
import { InputViewProps } from "./../../typerpc/input/InputView";
import { AnyWidgetConnection } from "./../../typerpc/widget/Widget";
import { WidgetViewProps } from "./../../typerpc/widget/WidgetView";
import { SystemView } from "./SystemView";

export function useSystemView<C extends AnyInputConnection>(
  connection: C,
  renderer: Renderer<InputViewProps<C>, [prev: Renderer<InputViewProps<C>>]>
): void;
export function useSystemView<C extends AnyWidgetConnection>(
  connection: C,
  renderer: Renderer<WidgetViewProps<C>, [prev: Renderer<WidgetViewProps<C>>]>
): void;
export function useSystemView(connection, renderer): void {
  useMemo(() => {
    SystemView.register(connection, renderer);
  }, [connection]);
}

export default useSystemView;
