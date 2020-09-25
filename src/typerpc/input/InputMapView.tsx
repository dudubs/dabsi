import * as React from "react";
import { createElement, Fragment, ReactElement } from "react";
import { entries } from "../../common/object/entries";
import { hasKeys } from "../../common/object/hasKeys";
import { mapObject } from "../../common/object/mapObject";
import { mapObjectToArray } from "../../common/object/mapObjectToArray";
import { values } from "../../common/object/values";
import { Renderer } from "../../react/renderer";
import { RpcConnection } from "../Rpc";
import {
  AnyWidget,
  WidgetController,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";
import { AnyInputConnection, InputError } from "./Input";
import { AnyInputMap, InputMap } from "./InputMap";
import { InputErrorOrData, InputView, InputViewProps } from "./InputView";

export type InputMapViewProps<
  C extends RpcConnection<InputMap<AnyInputMap>>,
  T extends Record<string, AnyInputConnection> = RpcConnection<
    WidgetController<C>
  >
> = InputViewProps<C> & {
  fields: { [K in string & keyof T]: Renderer<InputViewProps<T[K]>> };
  children?: Renderer<{ fields: Record<string & keyof T, ReactElement> }>;
};

export class InputMapView<
  C extends RpcConnection<InputMap<AnyInputMap>>
> extends InputView<C, InputMapViewProps<C>> {
  fields: Record<string, InputView<any> | undefined> = {};

  freezeElement(): WidgetElement<C> {
    return mapObject(this.fields, (field, key) => {
      if (field) return field.freezeElement();

      return this.frozenItemsElements[key] ?? this.element[key];
    });
  }

  async getValidData(): Promise<InputErrorOrData<C>> {
    let value = {};
    let error = {};
    for (let [key, input] of entries(
      this.props.connection.props.controller.props.items
    )) {
      const field = this.fields[key];
      if (field) {
        const result = await field.getValidData();
        value[key] = result.value;
        if ("error" in result) {
          error[key] = result.error;
        }
      } else {
        value[key] = input.props.getDataFromElement(
          this.frozenItemsElements[key] ?? this.element[key]
        );
      }
    }
    if (hasKeys(error)) return { error, value };
    return { value };
  }

  protected updateError(keyToError: InputError<C> | undefined) {
    if (typeof keyToError === "object") {
      for (let [key, input] of entries(
        this.props.connection.props.controller.props.items
      )) {
        const field = this.fields[key];
        const error = keyToError[key];
        if (field) {
          field.setError(error);
        } else if (error) {
          if (error) console.warn(`No input for error ${error}.`);
        }
      }
    }
  }

  reset() {
    super.reset();
    for (let field of values(this.fields)) {
      field?.reset();
    }
  }

  protected frozenItemsElements: Record<string, WidgetElement<AnyWidget>>;

  protected updateElement(element: WidgetType<C>["Element"]) {
    super.updateElement(element);
    this.frozenItemsElements = {};
  }

  renderField<K extends keyof RpcConnection<WidgetController<C>>>(
    key: string & K,
    renderer: Renderer<InputViewProps<RpcConnection<WidgetController<C>>[K]>>
  ) {
    return createElement(
      Fragment,
      { key },
      renderer({
        key,
        connection: this.controller[key],
        element: this.element[key],
        onChange: (view) => {
          this.frozenItemsElements[key] = view.freezeElement();
          this.props.onChange?.(this);
        },
        inputRef: (field) => {
          if (field) {
            this.fields[key] = field;
          } else {
            delete this.fields[key];
          }
        },
      })
    );
  }

  renderView(): React.ReactNode {
    if (typeof this.props.children === "function") {
      return this.props.children({
        fields: mapObject(
          this.props.fields,
          (renderer: Renderer<InputViewProps<any>>, key: any) => {
            return this.renderField(key, renderer);
          }
        ),
      });
    }

    return mapObjectToArray(
      this.props.fields,
      (renderer: Renderer<InputViewProps<any>>, key: any) => {
        return this.renderField(key, renderer);
      }
    );
  }
}
