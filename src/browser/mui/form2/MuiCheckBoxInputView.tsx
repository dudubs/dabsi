import Checkbox, {CheckboxProps} from "@material-ui/core/Checkbox";
import FormControlLabel, {FormControlLabelProps} from "@material-ui/core/FormControlLabel";
import React, {ReactNode} from "react";
import {mergeProps} from "../../../react/utils/mergeProps";
import {BoolInput} from "../../../rpc/input/BoolInput";
import {BoolInputView, BoolInputViewProps} from "../../../rpc/input/BoolInputView";
import {RpcConnection} from "../../../rpc/Rpc";


export type MuiCheckBoxInputViewProps<C extends RpcConnection<BoolInput>> =
    Omit<BoolInputViewProps<C>, "children"> & {
    label?: ReactNode
    FormControlLabelProps?: Partial<FormControlLabelProps>;
    CheckboxProps?: Partial<CheckboxProps>;
};

export function MuiCheckBoxInputView<C extends RpcConnection<BoolInput>>(
    {
        label,
        CheckboxProps,
        FormControlLabelProps,
        ...props
    }: MuiCheckBoxInputViewProps<C>) {

    return <BoolInputView {...props}>
        {input => {
            const checkbox = <Checkbox
                {...mergeProps(CheckboxProps, {
                    onChange: () => {
                        input.value = !input.value;
                    }
                })}
                checked={input.value}
            />;

            return label ? <FormControlLabel
                {...FormControlLabelProps}
                label={label}
                control={checkbox}/> : checkbox
        }}
    </BoolInputView>
}

