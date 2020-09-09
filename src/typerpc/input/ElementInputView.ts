import {ReactElement} from "react";
import {Renderer} from "../../react/renderer";
import {RpcConnection} from "../Rpc";
import {ElementWidgetView2} from "../widget/ElementWidgetView";
import {ElementInput} from "./ElementInput";
import {AnyInput, InputType} from "./Input";
import {InputViewProps} from "./InputView";

export const ElementInputView2 = ElementWidgetView2 as
    <C extends RpcConnection<ElementInput<any, AnyInput>>>(
        props: InputViewProps<C> & {
            target: Renderer<[
                InputType<C>['SubElement'],
                InputViewProps<RpcConnection<InputType<C>['SubInput']>>
            ]>
        }
    ) => ReactElement;
