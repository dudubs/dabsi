// import {RequireOptionalKeys} from "../../common/typings";
// import {RpcConfig} from "../Rpc";
// import {WidgetConfig, WidgetController, WidgetElement, WidgetType} from "../widget/Widget";
// import {AbstractNullableInputContext} from "./AbstractNullableInputContext";
// import {InputCheckResult, InputData, InputType, InputValue} from "./Input";
// import {SelectInput} from "./SelectInput";
// import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";
//
// type T = SelectInput<any, any>;
//
// export class SelectInputContext
//     extends AbstractNullableInputContext<T> {
//
//     protected getInputConfigForValue(value: InputType<T>["Value"]): WidgetConfig<InputType<T>> {
//         return {...this.config, default: value};
//     }
//
//     getControllerConfig(): RpcConfig<WidgetController<T>> {
//         return null
//     }
//
//     async getElement(): Promise<RequireOptionalKeys<WidgetElement<T>>> {
//
//         return {
//             default: await ValueOrAwaitableFn(this.config.default).then(value => {
//                 if (value && typeof value === "object") {
//                     return this.config.getKey(value)
//                 }
//                 return value
//             }),
//             options: await ValueOrAwaitableFn(this.config.options)
//         }
//     }
//
//     loadAndCheckNotNull(data: NonNullable<InputData<T>>): Promise<InputCheckResult<T>> {
//         return this.config.load(data);
//     }
//
//     getDataFromValue(value: InputValue<T>): InputData<T> {
//         return this.config.getKey(value);
//     }
//
//
//
// }
