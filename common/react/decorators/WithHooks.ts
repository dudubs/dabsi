import {createElement} from "react";
import {updateProp} from "../../object/updateProp";


export function WithHooks() {
    return function (target, prop, desc) {
        updateProp(target, prop, prev => function () {
            return function (...args) {
                // @ts-ignore
                return createElement(prev.bind(this, ...args), props);
            }
        })
    }
}
