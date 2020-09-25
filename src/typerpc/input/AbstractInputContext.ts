import {ContextualRpcContext} from "../ContextualRpc";
import {RpcConfig} from "../Rpc";
import {AbstractWidgetContext} from "../widget/AbstractWidgetContext";
import {WidgetConfig} from "../widget/Widget";
import {AnyInput, BaseInputContext, InputCheckResult, InputData, InputType, InputValue} from "./Input";

export abstract class AbstractInputContext<T extends AnyInput>
    extends AbstractWidgetContext<T>
    implements BaseInputContext<InputType<T>> {


    abstract loadAndCheck(data: InputData<T>):
        Promise<InputCheckResult<T>> ;

    abstract getDataFromValue(value: InputValue<T>): InputData<T>;

    protected abstract getInputConfigForValue(value: InputType<T>["Value"]): WidgetConfig<InputType<T>>;

    getConfigForValue(value: InputType<T>["Value"]): RpcConfig<T> {

        const config = this.getInputConfigForValue(value);

        return this.props.isGenericConfig ?
            $ => $(config) : config

    }

    getContextForValue(value: InputType<T>["Value"]): ContextualRpcContext<AnyInput> {

        const config = this.getInputConfigForValue(value);

        return new this.props.context(this.props,
            config
        );
    }
}





