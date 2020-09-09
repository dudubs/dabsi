import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {mapObjectToArray} from "../../common/object/mapObjectToArray";
import {Renderer} from "../../react/renderer";
import {RpcConnection} from "../Rpc";
import {DataInputMap} from "./DataInputMap";
import {AnyInput, InputData, InputError, InputType} from "./Input";
import {InputView, InputViewProps} from "./InputView";
import {InputViewError} from "./InputViewError";

export type DataInputMapViewProps<C extends RpcConnection<DataInputMap<AnyInput>>> = InputViewProps<C> & {
    input: Renderer<InputViewProps<RpcConnection<InputType<C>['DataInput']>>, [number]>
}

export class DataInputMapView<C extends RpcConnection<DataInputMap<AnyInput>>>
    extends InputView<C, DataInputMapViewProps<C>> {

    inputs: Record<string, InputView<RpcConnection<InputType<C>[ 'DataInput']>>> = {};

    async getValidData(): Promise<InputData<C>> {
        const errors = {};
        const data = {};
        for (const [key, input] of entries(this.inputs)) {
            try {
                data[key] = await input.getValidData();
            } catch (error) {
                if (error instanceof InputViewError) {
                    errors[key] = error;
                    continue;
                }
                throw error;
            }
        }
        if (hasKeys(errors))
            throw new InputViewError(errors);
        return data;
    }


    protected updateError(error: InputError<C> | undefined) {
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
