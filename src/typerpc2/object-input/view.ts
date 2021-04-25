import { InputView, InputViewProps } from "@dabsi/typerpc2/input/InputView";
import { AnyInputMap, ObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { Renderer } from "@dabsi/view/react/renderer";

export interface ObjectInputViewProps<T extends AnyInputMap>
  extends InputViewProps<ObjectInput<T>> {
  children?: Renderer<ObjectInputView<T>>;
}

export class ObjectInputView<T extends AnyInputMap> extends InputView<
  ObjectInput<T>,
  ObjectInputViewProps<T>
> {
  renderView() {
    return this.props.children?.(this)!;
  }

  getChildProps() {}

  getChildKeys() {}
}
