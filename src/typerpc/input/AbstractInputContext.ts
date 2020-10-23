// import { Awaitable } from "../../common/typings";
// import {
//   ContextualRpcContext,
//   ContextualRpcContextType,
// } from "../old/ContextualRpc";
// import { RpcConfigOld } from "../old/Old";
// import { AbstractWidgetContext } from "../old/AbstractWidgetContext";
// import { AnyWidget, WidgetConfig, WidgetType } from "../widget/Widget";
// import {
//   AnyInput,
//   BaseInputContext,
//   InputCheckResultType,
//   InputData,
//   InputType,
//   InputValue,
// } from "./Input";
//
// export abstract class AbstractInputContext<T extends AnyInput>
//   extends AbstractWidgetContext<T>
//   implements BaseInputContext<InputType<T>> {
//   abstract loadAndCheck(data: InputData<T>): Promise<InputCheckResultType<T>>;
//
//   protected abstract getInputConfigForValue(
//     value: InputType<T>["Value"]
//   ): WidgetConfig<WidgetType<T>>;
//
//   getConfigForValue(value: InputType<T>["Value"]): RpcConfigOld<T> {
//     const config = this.getInputConfigForValue(value);
//     return <any>(this.props.isGenericConfig ? $ => $(config) : config);
//   }
//
//   // getValue
//   abstract getDefaultValue(): Awaitable<InputValue<T> | undefined>;
//
//   getHandlerForValue(
//     value: InputType<T>["Value"]
//   ): ContextualRpcContextType<AnyInput> {
//     const config = this.getInputConfigForValue(value);
//
//     return new this.props.context(this.props, config);
//   }
// }
