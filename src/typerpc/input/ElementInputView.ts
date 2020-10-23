import { ReactElement } from "react";
import { Renderer } from "../../react/renderer";
import { RpcConnection } from "../Rpc";
import { ElementWidgetView } from "../widget/ElementWidgetView";
import { ElementInput } from "./ElementInput";
import { AnyInput, InputType } from "./Input";
import { InputViewProps } from "./InputView";

export const ElementInputView2 = ElementWidgetView as <
  C extends RpcConnection<ElementInput<any, AnyInput>>
>(
  props: InputViewProps<C> & {
    children: Renderer<
      [
        InputType<C>["SubElement"],
        InputViewProps<RpcConnection<InputType<C>["SubWidget"]>>
      ]
    >;
  }
) => ReactElement;
