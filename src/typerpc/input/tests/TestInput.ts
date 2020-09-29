import { RequireOptionalKeys } from "../../../common/typings";
import { NoRpc } from "../../NoRpc";
import { RpcConfig } from "../../Rpc";
import {
  WidgetConfig,
  WidgetController,
  WidgetElement,
} from "../../widget/Widget";
import { AbstractInputContext } from "../AbstractInputContext";
import {
  AnyInput,
  Input,
  InputCheckResult,
  InputData,
  InputHook,
  InputOptions,
  InputType,
  InputValue,
  TInput,
} from "../Input";

export function TestInput<T extends Partial<TInput>>({
  context = {},
  ...options
}: {
  context?: Partial<AbstractInputContext<any>>;
} & Partial<
  Pick<
    InputOptions<any, any>,
    "getDataFromValueElement" | "getValueElementFromElement"
  >
> = {}): InputHook<AnyInput, T> {
  return Input<any>({
    props: {},
    isGenericConfig: false,
    controller: NoRpc,
    context: class extends AbstractInputContext<any> {
      getControllerConfig(): RpcConfig<WidgetController<any>> {
        return context.getControllerConfig!();
      }

      async getElement(): Promise<RequireOptionalKeys<WidgetElement<any>>> {
        return context.getElement?.() ?? {};
      }

      protected getInputConfigForValue(
        value: InputType<any>["Value"]
      ): WidgetConfig<InputType<any>> {
        return context.getConfigForValue!(value);
      }

      loadAndCheck(data: InputData<any>): Promise<InputCheckResult<any>> {
        return context.loadAndCheck!(data);
      }
    },
    getDataFromValueElement(value) {
      throw options.getDataFromValueElement?.(value) ?? {};
    },
    getValueElementFromElement(element) {
      return options.getValueElementFromElement?.(element);
    },
  });
}
