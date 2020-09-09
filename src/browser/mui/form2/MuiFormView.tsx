import Grid from "@material-ui/core/Grid";
import React, {ReactElement} from "react";

import {mergeProps} from "../../../react/utils/mergeProps";
import {RpcConnection} from "../../../typerpc/Rpc";
import {AnyForm} from "../../../typerpc/widget/Form";
import {FormView, FormViewProps} from "../../../typerpc/widget/FormView";
import {MuiButton, MuiButtonProps} from "../components/MuiButton";

export type MuiFormViewProps<C extends RpcConnection<AnyForm>> =
    FormViewProps<C> & {

    MuiSubmitButtonProps?: Partial<MuiButtonProps>;
    MuiResetButtonProps?: Partial<MuiButtonProps>;


}

export function MuiFormView<C extends RpcConnection<AnyForm>>(
    props: MuiFormViewProps<C>
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


