import {CheckboxProps as CheckboxProps, FormControlLabel, FormControlLabelProps} from "@material-ui/core";
import CheckBox from "@material-ui/core/Checkbox";
import React from "react";
import {AbstractBoolField, AbstractBoolFieldProps} from "../../../../common/form/AbstractBoolField";
import {mergeProps} from "../../../react/utils/mergeProps";


export type MuiCheckBoxFieldProps = AbstractBoolFieldProps & {
    FormControlLabelProps?: Partial<FormControlLabelProps>;
    CheckboxProps?: Partial<CheckboxProps>
};


export class MuiCheckBoxField
    extends AbstractBoolField<MuiCheckBoxFieldProps> {

    renderInput() {
        let input = (<CheckBox
            {...mergeProps(this.props.CheckboxProps, {
                checked: this.value,
                onChange: event =>
                    this.onChange(event.target.checked)
            })}
        />);
        if (this.props.title) {
            input = <FormControlLabel
                {...this.props.FormControlLabelProps}
                label={this.props.title}
                control={input}/>;
        }
        return input;
    }
}


/*

    LayoutOld.Default<AbstractTextFieldProps>
    LayoutOld.Default(....)
 */
