import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {mapObjectToArray} from "../../common/object/mapObjectToArray";
import {Renderer} from "../../react/renderer";
import {WidgetType} from "../Widget";
import {DataInputMap} from "./DataInputMap";
import {AnyInput, InputType} from "./Input";
import {InputError} from "./InputError";
import {InputView, InputViewProps} from "./InputView";

export type DataInputMapViewProps<T extends AnyInput> = InputViewProps<DataInputMap<T>> & {
    input: Renderer<InputViewProps<T>, [number]>
}

export class DataInputMapView<T extends AnyInput>
    extends InputView<DataInputMap<T>, DataInputMapViewProps<T>> {

    inputs: Record<string, InputView<T>> = {};

    async getValidData(): Promise<InputType<DataInputMap<T>>["Data"]> {
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


    protected updateError(error: InputType<DataInputMap<T>>["Error"] | undefined) {
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
