import Checkbox, {CheckboxProps} from "@material-ui/core/Checkbox";
import {ReactNode} from "react";
import {mergeProps} from "../../../react/utils/mergeProps";
import {wrapIf} from "../../../react/utils/wrapIf";
import {BoolInputView, BoolInputViewProps} from "../../../rpc/input/BoolInputView";
import React from "react";
import FormControlLabel, {FormControlLabelProps} from "@material-ui/core/FormControlLabel";


export type MuiCheckBoxInputViewProps = Omit<BoolInputViewProps, "children"> & {
    label?: ReactNode
    FormControlLabelProps?: Partial<FormControlLabelProps>;
    CheckboxProps?: Partial<CheckboxProps>;
};

export function MuiCheckBoxInputView(
    {
        label,
        CheckboxProps,
        FormControlLabelProps,
        ...props
    }: MuiCheckBoxInputViewProps) {

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

