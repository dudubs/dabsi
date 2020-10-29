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
  target: Renderer<{
    props: InputViewProps<RpcConnection<InputType<C>["Types"]["Target"]>>;
    row: InputType<C>["Types"]["TableRow"];
    index: number;
    key: string;
  }>;
};

export class DataInputMapView<
  C extends RpcConnection<AnyDataInputMap>
> extends AbstractInputView<C, DataInputMapViewProps<C>> {
  children = new InputViewChildren();

  renderView(): React.ReactNode {
    return mapObjectToArray(
      this.value! || {},
      ({ $value, ...row }, key, index) => {
        return this.props.target({
          row,
          index,
          key,
          props: {
            key,
            value: $value,
            onChange: view =>
              this.setValue({
                ...this.value,
                [key]: {
                  ...row,
                  $value: view.value,
                },
              }),
            connection: this.controller.getRowController(key),
            element: this.element.target,
            inputRef: this.children.ref(key),
          },
        });
      }
    );
  }
}
