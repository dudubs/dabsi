// import React, {ReactNode} from "react";
// import {Awaitable} from "../../common/typings";
// import {ViewState} from "../../react/view/ViewState";
// import {WidgetType} from "../widget/Widget";
// import {DataSelectInput, DataInputOption} from "./DataSelectInput";
// import {InputType} from "./Input";
// import {InputView, InputViewProps} from "./InputView";
//
// export type DataInputViewProps<T> = InputViewProps<DataSelectInput<T>>;
//
// export class DataSelectInputView<T>
//     extends InputView<DataSelectInput<T>, DataInputViewProps<T> & {
//         children(view: DataSelectInputView<T>): ReactNode
//     }> {
//
//     @ViewState() selectedOption: DataInputOption | undefined;
//
//     getValidData(): Awaitable<InputType<DataSelectInput<T>>['Data']> {
//         return this.selectedOption?.key ?? null;
//     }
//
//     protected updateElement(element: WidgetType<DataSelectInput<T>>["Element"] | undefined) {
//         this.selectedOption =
//             element?.default ?
//                 element?.options.find(row => row.key === element?.default) : undefined;
//     }
//
//     select(value: DataInputOption | undefined | string) {
//         if (typeof value === "string")
//             value = this.element?.options.find(o => o.key === value);
//         this.selectedOption = value;
//     }
//
//     renderView(): React.ReactNode {
//         return this.props.children(this)
//     }
// }
//
