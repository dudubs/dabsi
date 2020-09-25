import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { mapObject } from "../../common/object/mapObject";
import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import { Awaitable } from "../../common/typings";
import { Renderer } from "../../react/renderer";
import { RpcConnection } from "../Rpc";
import { WidgetElement } from "../widget/Widget";
import { DataInputMap } from "./DataInputMap";
import { AnyInput, InputData, InputError, InputType } from "./Input";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";
import { InputViewError } from "./InputViewError";

export type DataInputMapViewProps<
  C extends RpcConnection<DataInputMap<AnyInput>>
> = InputViewProps<C> & {
  input: Renderer<
    InputViewProps<RpcConnection<InputType<C>["DataInput"]>>,
    [number]
  >;
};

export class DataInputMapView<
  C extends RpcConnection<DataInputMap<AnyInput>>
> extends InputView<C, DataInputMapViewProps<C>> {
  inputs: Record<
    string,
    InputView<RpcConnection<InputType<C>["DataInput"]>>
  > = {};

  async getValidData(): Promise<InputErrorOrData<C>> {
    const error = {};
    const value = {};
    for (const [key, input] of entries(this.inputs)) {
      const result = await input.getValidData();
      value[key] = result.value;
      if ("error" in result) value[key] = result.error;
    }
    if (hasKeys(error)) return { error, value };
    return { value };
  }

  protected updateError(error: InputError<C> | undefined) {
    for (let [key, input] of entries(this.inputs)) {
      input.setError(error?.[key]);
    }
  }

  renderView(): React.ReactNode {
    return mapObjectToArray(this.element, (element, key, index) => {
      return this.props.input(
        {
          onChange: () => {
            // this.element = {...element, [key]: await view.value}

            // this.setValue({  ...this.value, [key]: {
            // element:view.element, value: view.value
            // } })

            this.props.onChange?.(this);
          },
          connection: this.controller(key),
          key,
          element,
          inputRef: (input) => {
            if (input) {
              this.inputs[key] = input;
            } else {
              delete this.inputs[key];
            }
          },
        },
        index
      );
    });
  }

  freezeElement(): WidgetElement<C> {
    return <any>mapObject(this.inputs, (input) => input.freezeElement());
  }
}
