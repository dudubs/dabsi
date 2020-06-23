import {View} from "./View";

export function setViewStateKey(
    view: View,
    key: string,
    value,
) {


    if (view.currentState[key] === value)
        return false;
    view.currentState[key] = value;


    if (view.didMount && !view.didSetState) {
        view.didSetState = true;
        view.setState(state => {
            view.didSetState = false;
            return {...state, ...view.currentState}
        })
    }

    return true;
}
