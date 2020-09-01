import Checkbox, {CheckboxProps} from "@material-ui/core/Checkbox";
import FormControlLabel, {FormControlLabelProps} from "@material-ui/core/FormControlLabel";
import React, {ReactNode} from "react";
import {mergeProps} from "../../../react/utils/mergeProps";
import {BoolInputView, BoolInputViewProps} from "../../../rpc/input/BoolInputView";


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

