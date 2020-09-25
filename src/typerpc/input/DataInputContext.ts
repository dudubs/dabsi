import {RequireOptionalKeys} from "../../common/typings";
import {DataRow} from "../../data/DataRow";
import {RpcConfig, RpcError} from "../Rpc";
import {WidgetConfig, WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractNullableInputContext} from "./AbstractNullableInputContext";
import {DataInput} from "./DataInput";
import {InputCheckResult, InputData, InputType, InputValue} from "./Input";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

type T = DataInput<unknown, any>;

export class DataInputContext
    extends AbstractNullableInputContext<T> {

    protected getInputConfigForValue(value: InputType<T>["Value"]): WidgetConfig<InputType<T>> {
        return {...this.config, default: value};
    }

    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return $ => $({
            ...this.config.tableConfig,
            source: this.config.source,
            selection: this.config.selection,
            columns: {
                label: this.config.label,
                ...this.config.columns
            }
        })
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
        const keyOrRow = await ValueOrAwaitableFn(this.config.default);

        let dataRow: DataRow<any> | undefined;

        switch (typeof keyOrRow) {
            case "object":
                dataRow = keyOrRow ? keyOrRow : undefined;
                break;
            case "number":
            case "string":
                dataRow = await this.config.source.get(keyOrRow);
                break;
            default:
                dataRow = undefined;
        }
        return {
            default: dataRow && await this.controllerContext.getRowFromDataRow(dataRow)
        }
    }

    async loadAndCheckNotNull(key: NonNullable<InputData<T>>): Promise<InputCheckResult<T>> {
        if (!await this.config.source.filter({$is: key}).has())
            throw new RpcError(`Invalid data key "${key}".`)
        return {value: key}
    }

    getDataFromValue(value: InputValue<T>): InputData<T> {
        return value;
    }


}
