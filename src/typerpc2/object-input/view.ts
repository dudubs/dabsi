import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { AnyInput } from "@dabsi/typerpc2/input/Input";
import { InputView, InputViewProps } from "@dabsi/typerpc2/input/InputView";
import { AnyInputMap, ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { Renderer } from "@dabsi/view/react/renderer";
import React from "react";

export interface ObjectInputViewProps<T extends AnyInputMap>
  extends InputViewProps<ObjectInput<T>> {
  children?(view: ObjectInputView<T>): React.ReactNode;
}

export class ObjectInputView<T extends AnyInputMap> extends InputView<
  ObjectInput<T>,
  ObjectInputViewProps<T>
> {
  protected _childViewMap: Record<string, InputView<AnyInput>> = {};

  getChildProps<T extends AnyInputMap, K extends keyof T>(
    this: ObjectInputView<T>,
    childKey: string & K
  ): InputViewProps<T[K]> {
    return {
      parent: this,
      key: childKey,
      state: this.props.state?.[childKey],
      connection: this.connection[childKey],
      mapKey: childKey,
      inputRef: childView => {
        if (childView) {
          this._childViewMap[childKey] = childView;
        } else if (this._childViewMap[childKey] === childView) {
          delete this._childViewMap[childKey];
        }
      },
      element: this.element[childKey],
      value: this.props.value?.[childKey],
      onInputValue: childView => {
        this.setValue({ ...this.value!, [childKey]: childView.value });
      },
      onInputError: () => {
        this.props.onInputError?.(this);
      },
    };
  }
}
