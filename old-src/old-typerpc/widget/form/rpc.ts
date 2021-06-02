// /*

// TODO:
//   onSubmit(value, {resolve, reject}) {
//     return resolve();
//   }

//  */
// import { Rejectable } from "@dabsi/common/async/Rejectable";
// import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
// import { ConfigOrFactory } from "@dabsi/old-typerpc/ConfigFactory";
// import {
//   AnyInput,
//   InputError,
//   InputValue,
//   InputValueConfig,
//   InputValueData,
// } from "@dabsi/old-typerpc/input/Input";
// import { RpcUnresolvedConfig } from "@dabsi/old-typerpc/Rpc";
// import { FormHandler } from "@dabsi/old-typerpc/widget/form/handler";
// import {
//   Widget,
//   WidgetElement,
//   WidgetElementState,
// } from "@dabsi/old-typerpc/widget/Widget";

// export type TForm = {
//   Input: AnyInput;
//   Value: any;
//   Error: any;
// };
// export type AnyForm = Form<TForm>;

// export type Form<T extends TForm> = Widget<{
//   TForm: T;

//   Config: PartialUndefinedKeys<
//     {
//       inputConfig: RpcUnresolvedConfig<T["Input"]>;
//     },
//     {
//       valueConfig?: ConfigOrFactory<InputValueConfig<T["Input"]>>;

//       submit: Rejectable<InputValue<T["Input"]>, T["Value"], T["Error"]>;
//     }
//   >;

//   Element: WidgetElement<T["Input"]>;

//   Controller: {
//     input: T["Input"];
//     submit(
//       data: InputValueData<T["Input"]>
//     ):
//       | { value: T["Value"] }
//       | { inputError: InputError<T["Input"]> }
//       | { error: T["Error"] };
//   };

//   Props: {};

//   Handler: {};

//   ElementState: WidgetElementState<T["Input"]>;
// }>;

// export function Form<
//   Input extends AnyInput,
//   Value = any,
//   Error = any,
//   T extends TForm = {
//     Input: Input;
//     Value: Value;
//     Error: Error;
//   }
// >({ input }: { value?: Value; input: Input; error?: Error }): Form<T> {
//   return <any>Widget<AnyForm>({
//     children: { input },
//     type: Form,
//     handler: FormHandler,
//     commands: { submit: true },
//   });
// }

// //

// export class FormSubmitError {
//   constructor(public error) {}
// }
