import Grid from "@material-ui/core/Grid";
import React, {ReactElement} from "react";

import {mergeProps} from "../../../react/utils/mergeProps";
import {TForm} from "../../../rpc/widget/Form";
import {FormView, FormViewProps} from "../../../rpc/widget/FormView";
import {AnyInput} from "../../../rpc/input/Input";
import {MuiButton, MuiButtonProps} from "../components/MuiButton";

export type MuiFormViewProps<T extends TForm> =
    FormViewProps<T> & {

    MuiSubmitButtonProps?: Partial<MuiButtonProps>;
    MuiResetButtonProps?: Partial<MuiButtonProps>;


}

export function MuiFormView<Input extends AnyInput, Value, Error>(
    props: MuiFormViewProps<{
        Input: Input, Value: Value, Error: Error
    }>
): ReactElement {
    return <FormView {...props}>{({input, form}) =>
        <Grid container direction={"column"}>
            <Grid item>{input}</Grid>
            <Grid item>
                <MuiButton kind={"submit"} {...mergeProps(
                    props.MuiSubmitButtonProps, {
                        onClick: () => form.submit()
                    }
                )}/>
                <MuiButton kind={"reset"} {...mergeProps(
                    props.MuiResetButtonProps, {
                        onClick: () => form.reset()
                    }
                )}/>
            </Grid>
        </Grid>
    }</FormView>
}


