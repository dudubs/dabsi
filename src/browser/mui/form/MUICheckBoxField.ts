import {CheckboxProps as CheckBoxProps, FormControlLabel, FormControlLabelProps} from "@material-ui/core";
import CheckBox from "@material-ui/core/Checkbox";
import {ReactElement} from "react";
import {AbstractBoolField, AbstractBoolFieldProps} from "../../../../common/form/AbstractBoolField";
import {Layout} from "../../../react/utils/Layout";

export type MUICheckBoxFieldProps = AbstractBoolFieldProps & {
    FormControlLabel?: Layout.Default<FormControlLabelProps>;
    CheckBox?: Layout.Default<CheckBoxProps>
};


export class MUICheckBoxField
    extends AbstractBoolField<MUICheckBoxFieldProps> {

    renderInput() {
        let elem: ReactElement = Layout.Default(this.props.CheckBox, CheckBox, {
            onChange: event => this.onChange(event.target.checked)
        });
        if (this.props.title) {
            elem = Layout.Default(this.props.FormControlLabel, FormControlLabel, {
                label: this.props.title,
                control: elem
            });
        }
        return elem;
    }
}


/*

    Layout.Default<TextFieldProps>
    Layout.Default(....)
 */
