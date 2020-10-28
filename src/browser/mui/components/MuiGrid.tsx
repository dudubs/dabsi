import Grid, {GridProps} from "@material-ui/core/Grid";
import * as React from "react"; import {Children} from "react";

export type MuiGridProps = { item?: GridProps } & Omit<GridProps, "item" | "container">;

export function MuiGrid({item, children, ...props}: MuiGridProps) {
    return <Grid {...props} container>
        {Children.map(children, child => <Grid {...item} item>
            {child}
        </Grid>)}
    </Grid>
}

