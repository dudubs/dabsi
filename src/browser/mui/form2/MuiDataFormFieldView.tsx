import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {ReactNode} from "react";
import {DataInputView, DataInputViewProps} from "../../../rpc/input/DataInputView";
import InputLabel from "@material-ui/core/InputLabel";


export type MuiDataInputViewProps<T> = Omit<DataInputViewProps<T>, "children"> & {
    label?: ReactNode
};

export function MuiDataInputView<T>(
    {label, ...props}: MuiDataInputViewProps<T>
) {
    return <DataInputView {...props}>{view =>
        <FormControl error={view.error != null}>
            {label && <InputLabel>{label}</InputLabel>}
            <Select>
                {view.selected && <MenuItem value={view.selected.$key}>
                    {view.selected.label}
                </MenuItem>}
                {view.options.map(option => {
                    if (option.$key !== view.selected?.$key)
                        return <MenuItem value={option.$key} key={option.$key}>{
                            option.label
                        }</MenuItem>
                })}
            </Select>
            {view.error && <FormHelperText>{view.renderError()}</FormHelperText>}
        </FormControl>
    }</DataInputView>
}
