import Grid from "@material-ui/core/Grid";
import React from "react";
import {MUIButton, MUIButtonProps} from "../../../../browser/src/mui/components/MUIButton";
import {ObjectMerger} from "../../../common/object/Merger";
import {ValueOrFactory} from "../../../common/patterns/ValueOrFactory";
import {LangNode} from "../../../localization/Lang";
import {mergeCallback} from "../../../react/utils/mergeCallback";

export type MUIAction<T> = {
    title: LangNode,
    icon?: string,
    MUIButtonProps?: MUIButtonProps;
    handle(context: T);
};

export const MUIAction = ObjectMerger<MUIAction<any>>({
    handle: mergeCallback
});


export type MUIActionsProps<T> = {
    context: ValueOrFactory<T>,
    actions: MUIAction<T>[]

};

export function MUIActions(props: MUIActionsProps<any>) {
    return <Grid container direction={"row"} spacing={1}>
        {props.actions.map((action, index) =>
            <Grid item key={index}>
                {renderAction(action, index)}
            </Grid>
        )}
    </Grid>;

    function renderAction(action: MUIAction<any>, index: number) {
        return <MUIButton
            key={index}
            variant={"contained"}
            color={"primary"}
            title={action.title}
            endIcon={action.icon}
            {...action.MUIButtonProps}
            onClick={mergeCallback(action.MUIButtonProps?.onClick, () => {
                action.handle(ValueOrFactory(props.context))
            })}
        />
    }
}
