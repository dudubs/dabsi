import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { AnyInput, InputError } from "@dabsi/typerpc2/input/Input";
import { InputView, InputViewProps } from "@dabsi/typerpc2/input/InputView";
import { AnyInputMap, ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { entries } from "lodash";
import React from "react";

export interface ObjectInputViewProps<T extends AnyInputMap>
  extends InputViewProps<ObjectInput<T>> {}

export class ObjectInputView<T extends AnyInputMap> extends InputView<
  ObjectInput<T>,
  ObjectInputViewProps<T> & {
    children?(view: ObjectInputView<T>): React.ReactNode;
  }
> {
  protected _childViewMap: Record<string, InputView<AnyInput>> = {};

  setError(error: InputError<ObjectInput<T>> | undefined) {
    super.setError(error);

    const errorMap = error?.["map"];
    if (errorMap) {
      for (const [childKey, childInput] of entries(this._childViewMap)) {
        childInput.setError(errorMap[childKey]);
      }
    }
  }

  async validate() {
    await Promise.all([
      super.validate(),
      mapObjectToArray(this._childViewMap, childView => childView.validate()),
    ]);
  }

  getChildProps<T extends AnyInputMap, K extends keyof T>(
    this: ObjectInputView<T>,
    childKey: string & K
  ): InputViewProps<T[K]> {
    return {
      parent: this,
      key: childKey,
      state: this.props.state?.[childKey],
      connection: this.connection[childKey],
      childKey: childKey,
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
