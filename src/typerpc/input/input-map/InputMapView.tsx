import * as React from "react";
import { ReactElement } from "react";
import { keys } from "../../../common/object/keys";
import { Renderer } from "../../../react/renderer";
import { RpcConnection } from "../../Rpc";
import { WidgetElement } from "../../widget/Widget";
import { MapView } from "../../widget/widget-map/WidgetMapView";
import { AbstractInputView } from "../AbstractInputView";
import { AnyInput, AnyInputConnection } from "../Input";
import { InputViewProps } from "../InputView";
import { InputViewChildren } from "../InputViewChildren";
import { AnyInputMap } from "./InputMap";

export type AnyInputMapConnection = RpcConnection<AnyInputMap>;

export class InputMapView<C extends RpcConnection<AnyInputMap>>
  extends AbstractInputView<
    C,
    InputViewProps<C> & {
      children: Renderer<InputMapView<C>>;
    }
  >
  implements MapView<InputViewProps<AnyInputConnection>> {
  children = new InputViewChildren();

  getChildProps<K extends keyof C["map"]>(
    key: string & K
  ): InputViewProps<C["map"][K]> {
    {
      return ({
        key,
        mapKey: key,
        connection: this.connection.map[key] as AnyInputConnection,
        element: this.element.elementMap[key] as WidgetElement<AnyInput>,
        elementState: undefined,
        onElementStateChange: undefined,
        value: this.value?.[key],
        onError: view => this.props.onError?.(this),
        onChange: view =>
          this.setValue({
            ...this.value,
            [key]: view.value,
          }),
        inputRef: this.children.ref(key),
      } as InputViewProps<AnyInputConnection>) as any;
    }
  }

  getChildKeys(): Iterable<string & keyof C["map"]> {
    return keys(this.connection.map as any);
  }

  renderView(): React.ReactNode {
    return this.props.children(this);
  }
}
