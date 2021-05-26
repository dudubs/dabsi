import { setViewStateKey } from "../../setViewStateKey";
import { View } from "@dabsi/view/react/component/View";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";

export function ViewState(): { (target: View<any>, key): void };

export function ViewState<Method extends PropertyKey>(
  beforeUpdateMethod?: Method
): {
  (target: View<any> & Record<Method, () => any>, key): void;
};
export function ViewState<Method extends PropertyKey>(): MethodDecorator;

export function ViewState(updateMethod?) {
  return (target: View<any>, key: string, descriptor?) => {
    if (descriptor) {
      const map = new WeakMap();
      const { get } = descriptor;
      descriptor.get = function (this: View<any>) {
        let value = map.get(this.state);
        if (value || map.has(this.state)) {
          return value;
        }

        map.set(this.state, (value = get.call(this)));
        return value;
      };
      return;
    }
    Object.defineProperty(target, key, {
      get(this: View) {
        return this.currentState[key];
      },
      set(this: View<any>, value) {
        if (setViewStateKey(this, key, value)) {
          if (!this.isWillUnmount) {
            updateMethod && this[updateMethod]();
          }
        }
      },
    });
  };
}
