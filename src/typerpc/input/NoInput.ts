// import {Lazy} from "../../common/patterns/lazy";
// import {Awaitable, PartialUndefinedKeys, RequireOptionalKeys} from "../../common/typings";
// import {ContextualRpcContext} from "../ContextualRpc";
// import {NoRpc} from "../NoRpc";
// import {RpcConfig} from "../Rpc";
// import {WidgetConfig, WidgetController, WidgetElement} from "../widget/Widget";
// import {AbstractInputContext} from "./AbstractInputContext";
// import {AnyInput, Input, InputCheckResult, InputData, InputError, InputType, InputValue} from "./Input";
//
// export type NoInput<E extends object, T extends AnyInput> = Input<{
//
//     Data: InputData<T>
//
//     Value: InputValue<T>
//
//     Props: {
//         input: T
//     }
//
//     Config: PartialUndefinedKeys<{
//         inputConfig: RpcConfig<T>
//     }, {
//         default?: InputValue<T>
//         getElement: (value: InputValue<T> | undefined) => Awaitable<E>
//     }>
//
//     Element: E & {
//         data: InputData<T>
//     }
//
//     Controller: NoRpc
//
//     Error: InputError<T>
// }>
//
// export type AnyNoInput = NoInput<any, AnyInput>;
//
// export class NoInputContext extends AbstractInputContext<AnyNoInput> {
//
//     @Lazy() get inputContext(): ContextualRpcContext<AnyInput> {
//         return this.props.input.getContext(this.config)
//     }
//
//     protected getInputConfigForValue(value: InputType<AnyNoInput>["Value"]): WidgetConfig<InputType<AnyNoInput>> {
//         return {
//             ...this.config,
//             inputConfig: this.inputContext.getConfigForValue(value)
//         };
//     }
//
//     getControllerConfig(): RpcConfig<WidgetController<AnyNoInput>> {
//         return null;
//     }
//
//
//     loadAndCheck(data: InputData<AnyNoInput>): Promise<InputCheckResult<AnyNoInput>> {
//         return this.inputContext.loadAndCheck(data)
//     }
//
// }
//
// export function NoInput<E>() {
//     return <T extends AnyInput>(input: T) => {
//         return Input<AnyNoInput>({
//             props: {input},
//             context: NoInputContext
//         })
//     }
// }
