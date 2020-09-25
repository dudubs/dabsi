import {Lazy} from "../../common/patterns/lazy";
import {RequireOptionalKeys} from "../../common/typings";
import {ContextualRpcContext} from "../ContextualRpc";
import {RpcConfig} from "../Rpc";
import {ConfigFactory} from "../RpcGenericConfig";
import {AnyWidget, WidgetConfig, WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {EditableInput} from "./EditableInput";
import {AnyInput, InputCheckResult, InputData, InputType, InputValue} from "./Input";

type T = EditableInput<AnyInput, AnyWidget>;


export class EditableInputContext extends AbstractInputContext<T> {

    protected getInputConfigForValue(value: InputType<T>["Value"]): WidgetConfig<InputType<T>> {
        return {...this.config, default: value};
    }

    @Lazy() get defaultInputConfig() {
        return ConfigFactory(this.config.getInputConfig,
            this.config.default);
    }

    @Lazy() get defaultReadonlyConfig() {
        if (this.props.isDefaultReadonly)
            return () => this.config.default
        return ConfigFactory(this.config.getReadonlyConfig,
            this.config.default);
    }


    @Lazy() get defaultInputContext() {
        return this.controllerProps.items.input.getContext(
            this.defaultInputConfig
        );
    }

    getInputContext(inputValue): ContextualRpcContext<AnyInput> {
        return this.controllerProps.items.input.getContext(
            ConfigFactory(this.config.getInputConfig, inputValue)
        )
    }

    getControllerConfig(): RpcConfig<WidgetController<T>> {

        return {
            input: this.defaultInputConfig,
            readonly: this.defaultReadonlyConfig,
            doneToEdit: async data => {
                const result = await this.defaultInputContext.loadAndCheck(data);
                return {...result, value: await this.getReadonlyElement(result.value)}
            },
            edit: async data => {
                const result = await this.defaultInputContext.loadAndCheck(data);
                return {
                    ...result,
                    value: await this.getInputContext(result.value)
                        .getElement()
                }
            },
        }
    }

    getDataFromValue(value: InputValue<T>): InputData<T> {
        return this.defaultInputContext.getDataFromValue(value)
    }

    async getReadonlyElement(value: any) {

        return this.controllerProps.items.readonly
            .getContext(
                this.props.isDefaultReadonly ? value :
                    ConfigFactory(this.config.getReadonlyConfig, value))
            .getElement()
    }


    async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
        return {
            data: this.defaultInputContext.getDataFromValue(this.config.default),

            readonly: await this.getReadonlyElement(this.config.default),
        }
    }

    loadAndCheck(data: InputData<T>): Promise<InputCheckResult<T>> {
        return this.defaultInputContext.loadAndCheck(data)
    }

}
