import Grid, {GridProps} from "@material-ui/core/Grid";
import React from "react";
import {mapObject} from "../../../common/object/mapObject";
import {Renderer} from "../../../react/renderer";
import {AnyInputMap} from "../../../rpc/input/InputMap";
import {InputMapView, InputMapViewProps} from "../../../rpc/input/InputMapView";
import {InputViewProps} from "../../../rpc/input/InputView";


type RendererOrFieldProps<P, FieldProps> =
    Renderer<P> | [Renderer<P>, FieldProps?];

type FieldProps = {
    GridProps?: Partial<GridProps>
};

export type MuiInputMapViewProps<T extends AnyInputMap> =
    Omit<InputMapViewProps<T>, "fields"> & {

    noGrid?: boolean;

    GridProps?: Partial<GridProps>;

    fields: {
        [K in keyof T]: RendererOrFieldProps<InputViewProps<T[K]>, FieldProps>
    }

};

export function MuiInputMapView<T extends AnyInputMap>(
    {
        noGrid, GridProps,
        fields, ...props
    }: MuiInputMapViewProps<T>
) {

    const content = <InputMapView
        {...props}
        fields={mapObject(fields,
            (rendererOrFieldProps, key) => props => {

                let renderer: Renderer<InputViewProps<any>>;
                let fieldProps: FieldProps | undefined;

                if (typeof rendererOrFieldProps === "function") {
                    [renderer, fieldProps] = [rendererOrFieldProps, {}]
                } else {
                    [renderer, fieldProps] = rendererOrFieldProps;
                }

                const content = renderer(props);

                return noGrid ? content :
                    <Grid key={key} item {...fieldProps?.GridProps}>{content}</Grid>;

            }) as InputMapViewProps<T>['fields']}
    />;

    return noGrid ? content :
        <Grid container {...GridProps}>{content}</Grid>;

}
