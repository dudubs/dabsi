import {setViewStateKey} from "./setViewStateKey";
import {View} from "./View";


export function ViewState<Method extends PropertyKey>(beforeUpdateMethod?: Method) {
    return (target: View<any>, key: string) => {
        Object.defineProperty(target, key, {
            get(this: View) {
                return this.currentState[key];
            },
            set(this: View & Record<Method, () => void>, value) {

                if (setViewStateKey(this, key, value)) {
                    beforeUpdateMethod && this[beforeUpdateMethod]();
                }

            }
        });
    }
}

