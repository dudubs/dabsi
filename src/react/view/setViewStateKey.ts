import { View } from "./View";

export function setViewStateKey(view: View, key: string, value) {
  if (view.currentState[key] === value) return false;
  view.currentState[key] = value;

  if (view.isDidMount && !view.isDidSetState) {
    view.isDidSetState = true;
    view.setState((state) => {
      view.isDidSetState = false;
      return { ...state, ...view.currentState };
    });
  }

  return true;
}
