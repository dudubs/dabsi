import * as React from "react";
import { ReactNode } from "react";
import { RpcConnection } from "../../Rpc";
import { WidgetElement } from "../../widget/Widget";
import { AbstractInputView } from "../AbstractInputView";
import { AnyInput, AnyInputConnection, BasedInput, InputType } from "../Input";
import { InputViewProps } from "../InputView";
import { InputViewChildren } from "../InputViewChildren";
import { AnyInputMap } from "./InputMap";

export type AnyInputMapConnection = RpcConnection<AnyInputMap>;

export class InputMapView<
  C extends RpcConnection<AnyInputMap>
> extends AbstractInputView<
  C,
  InputViewProps<C> & {
    children(
      getProps: <K extends keyof C["map"]>(
        key: string & K
      ) => InputViewProps<C["map"][K]>
    ): ReactNode;
  }
> {
  children = new InputViewChildren();

  renderView(): React.ReactNode {
    return this.props.children((key: any) => {
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
    });
  }
}
