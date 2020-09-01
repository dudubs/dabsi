import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../Widget";
import {AbstractInputContext, AnyInput, InputCheckResult, InputType} from "./Input";
import {ElementInput} from "./InputElement";

export class ElementInputContext<T extends ElementInput<E, I>, E, I extends AnyInput>
    extends AbstractInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return undefined;
    }

    async getElement(): Promise<WidgetElement<T>> {
        return [await this.config.getElement(),
            await this.props.target.getContext(this.config.target).getElement()]
    }

    loadAndCheck(data: InputType<T>["Data"]): Promise<InputCheckResult<T>> {
        return this.props.target
            .getContext(this.config.target)
            .loadAndCheck(data)
    }

}
