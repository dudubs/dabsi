export default function setViewStateKey(
  view: {
    currentState: any;
    isDidMount: boolean;
    isDidSetState: boolean;
    isWillUnmount: boolean;
    setState(callback: (state: any) => any);
  },
  key: string,
  value
) {
  if (view.currentState[key] === value) return false;
  view.currentState[key] = value;

  if (view.isDidMount && !view.isDidSetState && !view.isWillUnmount) {
    view.isDidSetState = true;
    view.setState(state => {
      view.isDidSetState = false;
      return { ...state, ...view.currentState };
    });
  }

  return true;
}
