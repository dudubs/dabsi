import { keys } from "@dabsi/common/object/keys";
import { Renderer } from "@dabsi/view/react/renderer";
import { AnyInput, AnyInputConnection } from "@dabsi/typerpc/input/Input";
import { AnyInputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import {
  AbstractInputView,
  InputViewProps,
} from "@dabsi/typerpc/input/InputView";
import { InputViewChildren } from "@dabsi/typerpc/input/InputViewChildren";
import { RpcConnection } from "@dabsi/typerpc/Rpc";
import { WidgetElement } from "@dabsi/typerpc/widget/Widget";
import { MapView } from "@dabsi/typerpc/widget/widget-map/view";
import React from "react";

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
