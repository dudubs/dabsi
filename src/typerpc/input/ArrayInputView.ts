// import {ReactElement} from "react";
// import {Awaitable} from "../../common/typings";
// import {RpcConnection} from "../Rpc";
// import {WidgetType} from "../widget/Widget";
// import {ArrayInput} from "./ArrayInput";
// import {AnyInput, InputType} from "./Input";
// import {InputView, InputViewProps} from "./InputView";
//
// export type AnyArrayInputConnection = RpcConnection<ArrayInput<AnyInput>>;
//
// export class ArrayInputView<C extends AnyArrayInputConnection>
//     extends InputView<C, InputViewProps<C> & {
//         children(view: ArrayInputView<C>):ReactElement
//     }> {
//
//     // items: InputView<RpcConnection<InputType<C>['Item']>> = [
//     //
//     // ];
//
//     getValidData(): Awaitable<InputType<C>["Data"]> {
//         return undefined;
//     }
//
//     renderView(): React.ReactNode {
//         return undefined;
//     }
//
// }
