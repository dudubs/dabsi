import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import { Renderer } from "../../react/renderer";
import { RpcConnection } from "../Rpc";
import { DataTableRowWithKey } from "../widget/DataTable";
import { AnyDataInputMap, DataInputMap } from "./DataInputMap";
import { AnyInput, InputType } from "./Input";
import { InputView, InputViewProps } from "./InputView";
import { InputViewChildren } from "./InputViewChildren";

export type DataInputMapViewProps<
  C extends RpcConnection<AnyDataInputMap>
> = InputViewProps<C> & {
  target: Renderer<{
    props: InputViewProps<RpcConnection<InputType<C>["DataInput"]>>;
    row: DataTableRowWithKey<InputType<C>["Props"]["table"]>;
    index: number;
  }>;
};

export class DataInputMapView<
  C extends RpcConnection<AnyDataInputMap>
> extends InputView<C, DataInputMapViewProps<C>> {
  children = new InputViewChildren();

  // new InputViewTarget()

  renderView(): React.ReactNode {
    return this.element.children.map(({ row, target }, index) => {
      const key = row.key;
      return this.props.target({
        row,
        index,
        props: {
          onChange: (view) =>
            this.setValue({
              ...this.value,
              [key]: view.value,
            }),
          connection: this.controller.row(key),
          key,
          element: target,
          error: this.children.keyToError[key],
          inputRef: this.children.ref(key),
        },
      });
    });
  }
}
