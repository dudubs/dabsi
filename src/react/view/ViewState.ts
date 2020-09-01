import {setViewStateKey} from "./setViewStateKey";
import {View} from "./View";


export function ViewState(): { (target: View<any>, key): void }
export function ViewState<Method extends PropertyKey>(beforeUpdateMethod?: Method): {
    (target: View<any> & Record<Method, () => any>, key): void
}
export function ViewState(beforeUpdateMethod?) {
    return (target: View<any>, key: string) => {
        Object.defineProperty(target, key, {
            get(this: View) {
                return this.currentState[key];
            },
            set(this, value) {

                if (setViewStateKey(this, key, value)) {
                    beforeUpdateMethod && this[beforeUpdateMethod]();
                }

            }
        });
    }
}

