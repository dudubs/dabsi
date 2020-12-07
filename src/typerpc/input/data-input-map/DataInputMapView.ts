import { ReactElement } from "react";
import { hasKeys } from "../../../common/object/hasKeys";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { Renderer } from "../../../react/renderer";
import { RpcConnection } from "../../Rpc";
import { AbstractInputView } from "../AbstractInputView";
import { InputType } from "../Input";
import { InputViewProps } from "../InputView";
import { InputViewChildren } from "../InputViewChildren";
import { AnyDataInputMap } from "./DataInputMap";

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
