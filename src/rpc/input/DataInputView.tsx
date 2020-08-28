import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {ReactElement, ReactNode} from "react";
import {Awaitable} from "../../common/typings";
import {ViewState} from "../../react/view/ViewState";
import {BaseInputView, BaseInputViewProps} from "./BaseInputView";
import {DataInput} from "./DataInput";
import {InputType} from "./Input";

export type DataInputViewProps<T> = BaseInputViewProps<DataInput<T>> & {
    children(view: DataInputView<T>): ReactNode
};

export class DataInputView<T>
    extends BaseInputView<DataInput<T>, DataInputViewProps<T>> {

    @ViewState() options: ({ label: string, $key: string })[] = [];

    @ViewState() isLoading = false;

    @ViewState() isLoaded = false;

    @ViewState() selected?: { $key: string, label: string };

    getValidData(): Awaitable<InputType<DataInput<T>>['Data']> {
        return this.selected?.$key ?? null;
    }

    setBaseElement(element: InputType<DataInput<T>>["Element"] | null): void {
        this.selected = element?.default;
        this.options = element?.options || [];
    }

    renderView(): React.ReactNode {
        return this.props.children(this)
    }
}

