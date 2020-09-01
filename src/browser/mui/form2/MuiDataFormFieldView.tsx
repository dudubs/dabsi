import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {ReactNode} from "react";
import {DataSelectInputView, DataInputViewProps} from "../../../rpc/input/DataSelectInputView";
import InputLabel from "@material-ui/core/InputLabel";


export type MuiDataSelectInputViewProps<T> = DataInputViewProps<T> & {
    label?: ReactNode
};

export function MuiDataSelectInputView<T>(
    {label, ...props}: MuiDataSelectInputViewProps<T>
) {
    return <DataSelectInputView {...props}>{view =>
        <FormControl error={view.error != null} onChange={() => {
            console.log("TODO.");
        }}>
            {label && <InputLabel>{label}</InputLabel>}
            <Select>
                {view.selectedOption && <MenuItem value={view.selectedOption.key}>
                    {view.selectedOption.label}
                </MenuItem>}
                {view.element?.options.map(option => {
                    if (option.key !== view.selectedOption?.key)
                        return <MenuItem value={option.key} key={option.key}>{
                            option.label
                        }</MenuItem>
                })}
            </Select>
            {view.error && <FormHelperText>{view.renderError()}</FormHelperText>}
        </FormControl>
    }</DataSelectInputView>
}
