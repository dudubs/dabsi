import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {mapObjectToArray} from "../../common/object/mapObjectToArray";
import {NonNullableAt} from "../../common/typings";
import {Renderer} from "../../react/renderer";
import {RpcConnection} from "../Rpc";
import {DataInputMap} from "./DataInputMap";
import {AnyInput, InputType} from "./Input";
import {InputError} from "./InputError";
import {InputView, InputViewProps} from "./InputView";

export type DataInputMapViewProps<C extends RpcConnection<DataInputMap<AnyInput>>> = InputViewProps<C> & {
    input: Renderer<InputViewProps<

        RpcConnection<NonNullableAt<InputType<C>, 'TDataInputMap'>['Input']>

        >, [number]>
}

export class DataInputMapView<C extends RpcConnection<DataInputMap<AnyInput>>>
    extends InputView<C, DataInputMapViewProps<C>> {

    inputs: Record<string, InputView<
        RpcConnection<NonNullableAt<InputType<C>, 'TDataInputMap'>['Input']>
        >> = {};

    async getValidData(): Promise<InputType<C>["Data"]> {
        const errors = {};
        const data = {};
        for (const [key, input] of entries(this.inputs)) {
            try {
                data[key] = await input.getValidData();
            } catch (error) {
                if (error instanceof InputError) {
                    errors[key] = error;
                    continue;
                }
                throw error;
            }
        }
        if (hasKeys(errors))
            throw new InputError(errors);
        return data;
    }


    protected updateError(error: InputType<C>["Error"] | undefined) {
        for (let [key, input] of entries(this.inputs)) {
            input.setError(error?.[key]);
        }
    }

    renderView(): React.ReactNode {
        return mapObjectToArray(this.element || {}, (element, key, index) => {
            return this.props.input({
                connection: this.props.connection.controller(key),
                key,
                element,
                inputRef: input => {
                    if (input) {
                        this.inputs[key] = input;
                    } else {
                        delete this.inputs[key]
                    }
                }
            }, index)
        })
    }

}
