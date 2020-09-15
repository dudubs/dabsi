import {RequireOptionalKeys} from "../../common/typings";
import {ContextualRpcContext} from "../ContextualRpc";
import {RpcConfig, RpcError} from "../Rpc";
import {RpcConfigFactory} from "../RpcGenericConfig";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {ArrayInput} from "./ArrayInput";
import {AnyInput, InputCheckResult, InputData, InputValue} from "./Input";

type T = ArrayInput<AnyInput>;

export class ArrayInputContext
    extends AbstractInputContext<T>
    implements ContextualRpcContext<ArrayInput<AnyInput>> {

    assertIndex(index: number) {
        if ((index >= (this.config?.maxLength || 0))
            || (0 > index)) {
            throw new RpcError(`Invalid index ${index}`)
        }
    }

    getDataFromValue(value: InputValue<T>): InputData<T> {
        throw new Error()
    }

    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return $ => $({
            load: async (index) => {
                this.assertIndex(index)
                return index
            },
            getTargetConfig: ($, index) => {
                return $(this.getItemConfig(index));
            }
        })
    }

    protected itemConfigCache = {};

    getItemConfig(index: number) {
        if (!this.config?.getItemConfig)
            return this.config?.itemConfig
        if (index in this.itemConfigCache)
            return this.itemConfigCache[index];
        return this.itemConfigCache[index] =
            RpcConfigFactory(this.config.getItemConfig, index)
    }

    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
        const items: WidgetElement<AnyInput>[] = [];

        for (let context of ((await this.config?.getDefaultConfig?.())
                ?.map(config => this.props
                    .controller.target.getContext(config))
            || [])) {
            items.push(await context.getElement())
        }


        return {
            items,
            maxLength: this.config?.maxLength,
            minLength: this.config?.minLength
        }
    }

    async loadAndCheck(items: InputData<T>): Promise<InputCheckResult<T>> {
        if (items.length > (this.config?.maxLength || 0))
            return {error: 'TOO_MANY_ITEMS'}
        if (items.length < (this.config?.minLength || 0))
            return {error: 'TOO_FEW_ITEMS'};
        const values: InputValue<T> = [];
        const errors: any[] = [];
        for (const [index, data] of items.entries()) {
            const result = await this.props.controller.target
                .getContext(this.getItemConfig(index))
                .loadAndCheck(data)
            if ('error' in result) {
                errors.push(result.error)
            } else if (errors.length) {
                errors.push(null)
            } else {
                values.push(result.value)
            }
        }
        if (errors.length)
            return {error: errors}
        return {value: values}
    }

}
