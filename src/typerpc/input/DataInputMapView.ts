import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { mapObject } from "../../common/object/mapObject";
import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import { values } from "../../common/object/values";
import { Awaitable } from "../../common/typings";
import { Renderer } from "../../react/renderer";
import { RpcConnection } from "../Rpc";
import { WidgetElement } from "../widget/Widget";
import { DataInputMap } from "./DataInputMap";
import {
  AnyInput,
  InputData,
  InputError,
  InputType,
  InputValueElement,
} from "./Input";
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
  keyToInput: Record<
    string,
    InputView<RpcConnection<InputType<C>["DataInput"]>>
  > = {};

  async getError() {
    const keyToError = {};
    for (const [key, input] of entries(this.keyToInput)) {
      await input.checkError((error) => {
        keyToError[key] = error;
      });
    }
    if (hasKeys(keyToError)) return { items: keyToError };
  }

  keyToError: Record<string, any> | undefined;
  protected updateError(error: InputError<C> | undefined) {
    this.keyToError =
      error && typeof error == "object" && "items" in error
        ? error.items
        : undefined;
  }

  renderView(): React.ReactNode {
    return mapObjectToArray(this.element, (element, key, index) => {
      return this.props.input(
        {
          /*
          onChange({value}) {
            this.setValue({
                ...this.value, [key]: value
            })
          }
           */
          onChange: (view) =>
            this.checkValue({ ...this.value, [key]: view.value }),
          connection: this.controller(key),
          key,
          element,
          error: this.keyToError?.[key],
          inputRef: (input) => {
            if (input) {
              this.keyToInput[key] = input;
            } else {
              delete this.keyToInput[key];
            }
          },
        },
        index
      );
    });
  }
}
