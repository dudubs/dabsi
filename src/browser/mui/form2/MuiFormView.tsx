import Grid, {GridProps} from "@material-ui/core/Grid";
import React, {ReactNode} from "react";
import {Renderer} from "../../../react/renderer";
import {mergeProps} from "../../../react/utils/mergeProps";
import {AnyFormFields} from "../../../rpc/FormField";
import {FormView, FormViewProps} from "../../../rpc/FormView";
import {MuiButton, MuiButtonProps} from "../components/MuiButton";

type LayoutRenderer = Renderer<{
    content: ReactNode,
    resetButton: ReactNode
    submitButton: ReactNode
}>;

type MuiFormViewFieldProps = {
    GridProps?: Partial<GridProps> };

export type MuiFormViewProps<F extends AnyFormFields, R> =
    FormViewProps<F, R, MuiFormViewFieldProps> & {
    renderLayout?: LayoutRenderer

    MuiSubmitButtonProps?: Partial<MuiButtonProps>;
    MuiResetButtonProps?: Partial<MuiButtonProps>;

    noGrid?:boolean
    GridProps?: Partial<GridProps>;
};


export class MuiFormView<F extends AnyFormFields, R>
    extends FormView<F, R, MuiFormViewFieldProps, MuiFormViewProps<F, R>> {

    renderFieldProps(key: string, props: Partial<MuiFormViewFieldProps>, element: React.ReactElement): React.ReactNode {
        if(!this.props.noGrid)
            element =<Grid key={key} item {...props.GridProps}>{element}</Grid>;
        return element
    }

    renderView(): React.ReactNode {
        return (this.props.renderLayout || defaultLayoutRenderer)({
            content:
                <Grid container {...this.props.GridProps}>{super.renderView()}</Grid>,
            resetButton: <MuiButton kind="submit" {...mergeProps(this.props.MuiResetButtonProps, {
                onClick: () => this.reset()
            })}/>,
            submitButton: <MuiButton kind={"submit"} {...mergeProps(this.props.MuiSubmitButtonProps, {
                onClick: () => this.submit
            })}/>
        })
    }

}

const defaultLayoutRenderer: LayoutRenderer = (props) => {
    return <Grid container direction={"column"}>
        <Grid item>
            {props.content}
        </Grid>
        <Grid item>
            {props.resetButton}
            {props.resetButton}
        </Grid>
    </Grid>
}
