import React, {Fragment} from "react";
import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {mapObjectToArray} from "../../common/object/mapObjectToArray";
import {values} from "../../common/object/values";
import {Renderer} from "../../react/renderer";
import {RpcConnection} from "../Rpc";
import {AnyInput, InputData, InputError, InputType} from "./Input";
import {InputViewError} from "./InputViewError";
import {AnyInputMap, InputMap} from "./InputMap";
import {InputView, InputViewProps} from "./InputView";


export type InputMapViewProps<C extends RpcConnection<InputMap<AnyInputMap>>,
    T extends Record<string, RpcConnection<AnyInput>> = C['controller']> =
    InputViewProps<C> & {

    fields: { [K in keyof T]: Renderer<InputViewProps<T[K]>> }

};

export class InputMapView<C extends RpcConnection<InputMap<AnyInputMap>>>
    extends InputView<C, InputMapViewProps<C>> {

    fields: Record<string, InputView<any>> = {};

    async getValidData(): Promise<InputData<C>> {
        let data: any = {};
        let errors: any = {};
        for (const [key, field] of entries(this.fields)) {
            try {
                data[key] = await field?.getValidData();
            } catch (error) {
                if (error instanceof InputViewError) {
                    errors[key] = error.error;
                }
                throw error;
            }
        }
        if (hasKeys(errors))
            throw new InputViewError(errors);
        return data;
    }


    protected updateError(error: InputError<C> | undefined) {
        for (let [key, field] of entries(this.fields)) {
            field?.setError(error?.[key])
        }
    }

    reset() {
        super.reset();
        for (let field of values(this.fields)) {
            field?.reset()
        }
    }


    renderView(): React.ReactNode {
        return mapObjectToArray(this.props.fields, (
            renderer: Renderer<InputViewProps<any>>, key) => {
            return <Fragment key={key}>
                {renderer({
                    key,
                    connection: this.props.connection.controller[key],
                    element: this.element?.[key],
                    inputRef: field => {
                        if (field) {
                            this.fields[key] = field;
                        } else {
                            delete this.fields[key];
                        }
                    }
                })}
            </Fragment>
        })
    }


}
