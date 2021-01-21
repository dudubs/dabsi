import { hasKeys } from "@dabsi/common/object/hasKeys";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { Renderer } from "@dabsi/react/renderer";
import { AnyDataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import {
  AbstractInputView,
  InputViewProps,
} from "@dabsi/typerpc/input/InputView";
import { InputViewChildren } from "@dabsi/typerpc/input/InputViewChildren";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { ReactElement } from "react";

export type DataInputMapViewProps<
  C extends RpcConnection<AnyDataInputMap>
> = InputViewProps<C> & {
  noKeys?: ReactElement;
  renderTarget: Renderer<
    InputViewProps<C["target"]>,
    [
      {
        label: string;
        index: number;
        key: string;
      }
    ]
  >;
};

export class DataInputMapView<
  C extends RpcConnection<AnyDataInputMap>
> extends AbstractInputView<C, DataInputMapViewProps<C>> {
  children = new InputViewChildren();

  renderView(): React.ReactNode {
    if (!hasKeys(this.value)) {
      return this.props.noKeys;
    }

    return mapObjectToArray(
      this.value! || {},
      ({ value, label }, key, index) => {
        return this.props.renderTarget(
          {
            key,
            value,
            elementState: undefined,
            onElementStateChange: undefined,
            onChange: view =>
              this.setValue({
                ...this.value,
                [key]: {
                  label,
                  value: view.value,
                },
              }),
            connection: this.connection.target,
            element: this.element.target,
            inputRef: this.children.ref(key),
          },
          {
            label,
            index,
            key,
          }
        );
      }
    );
  }
}
