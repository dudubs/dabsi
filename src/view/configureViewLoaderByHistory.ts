import ViewLoader from "@dabsi/view/ViewLoader";
import { History } from "history";

// configureHistoryForViewLoader
export default function configureViewLoaderByHistory(history: History) {
  const getCurrentState = () => history.location.state as any;

  let hasHistoryEvent = false;

  history.listen(() => {
    hasHistoryEvent = true;
  });

  ViewLoader.configure({
    setState(key, value) {
      const state = getCurrentState();
      history.replace(history.location, {
        ...state,
        VIEW_STATE: { ...state?.VIEW_STATE, ...{ [key]: value } },
      });
    },
    getState(key) {
      if (hasHistoryEvent) {
        return getCurrentState()?.VIEW_STATE?.[key];
      }
    },
  });
}
