import React, {Fragment} from "react";
import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {mapObjectToArray} from "../../common/object/mapObjectToArray";
import {values} from "../../common/object/values";
import {Renderer} from "../../react/renderer";
import {ViewState} from "../../react/view/ViewState";
import {WidgetElement, WidgetType} from "../widget/Widget";
import {InputType} from "./Input";
import {InputError} from "./InputError";
import {AnyInputMap, InputMap} from "./InputMap";
import {InputView, InputViewProps} from "./InputView";


export type InputMapViewProps<T extends AnyInputMap> =
    InputViewProps<InputMap<T>> & {

    fields: { [K in keyof T]: Renderer<InputViewProps<T[K]>> }

};

export class InputMapView<T extends AnyInputMap>
    extends InputView<InputMap<T>, InputMapViewProps<T>> {

    fields: Record<string, InputView<any>> = {};

    async getValidData(): Promise<InputType<InputMap<T>>["Data"]> {
        let data: any = {};
        let errors: any = {};
        for (const [key, field] of entries(this.fields)) {
            try {
                data[key] = await field?.getValidData();
            } catch (error) {
                if (error instanceof InputError) {
                    errors[key] = error.error;
                }
                throw error;
            }
        }
        if (hasKeys(errors))
            throw new InputError(errors);
        return data;
    }


    protected updateError(error: InputType<InputMap<T>>["Error"] | undefined) {
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
