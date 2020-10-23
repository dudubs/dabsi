import { Awaitable, RequireOptionalKeys } from "../../../common/typings";
import { NoRpc } from "../../NoRpc";
import { RpcConfigOld } from "../../old/Old";
import {
  TWidget,
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../../widget/Widget";
import { AbstractInputContext } from "../AbstractInputContext";
import {
  AnyInput,
  Input,
  InputCheckResultType,
  InputValueData,
  InputOptions,
  InputType,
  InputValue,
  TInput,
} from "../Input";
import { InputHook } from "../InputHook";

export function TestInput<T extends Partial<TInput>>({
  context = {},
  ...options
}: {
  context?: Partial<AbstractInputContext<any>>;
} & Partial<
  Pick<InputOptions<any, any>, "getValueData" | "getValueElementFromElement">
> = {}): InputHook<AnyInput, T> {
  return Input<any>({
    props: {},
    isGenericConfig: false,
    controller: NoRpc,
    context: class extends AbstractInputContext<any> {
      getControllerConfig(): RpcConfigOld<WidgetController<any>> {
        return context.getControllerConfig!();
      }
      getDefaultValue(): Awaitable<InputValue<any> | undefined> {
        return undefined;
      }

      async getElement(): Promise<RequireOptionalKeys<WidgetElement<any>>> {
        return context.getElement?.() ?? {};
      }

      protected getInputConfigForValue(
        value: InputType<any>["Value"]
      ): WidgetConfig<TWidget> {
        return context.getConfigForValue!(value);
      }

      loadAndCheck(
        data: InputValueData<any>
      ): Promise<InputCheckResultType<any>> {
        return context.loadAndCheck!(data);
      }
    },
    getValueData(value) {
      throw options.getValueData?.(value) ?? {};
    },
    getValueElementFromElement(element) {
      return options.getValueElementFromElement?.(element);
    },
  });
}
