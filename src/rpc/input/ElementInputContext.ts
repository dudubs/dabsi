import {RpcConfig} from "../Rpc";
import {WidgetController, WidgetElement} from "../widget/Widget";
import {AbstractInputContext} from "./AbstractInputContext";
import {AnyInput, InputCheckResult, InputType} from "./Input";
import {ElementInput} from "./ElementInput";

export class ElementInputContext<T extends ElementInput<E, I>, E, I extends AnyInput>
    extends AbstractInputContext<T> {
    getControllerConfig(): RpcConfig<WidgetController<T>> {
        return undefined;
    }

    async getElement(): Promise<WidgetElement<T>> {
        return [await this.config.getElement(),
            await this.props.controller.getContext(this.config.target).getElement()]
    }

    async loadAndCheck(data: InputType<T>["Data"]): Promise<InputCheckResult<T>> {
        return (await this.props.controller
            .getContext(this.config.target))
            .loadAndCheck(data)
    }

}
