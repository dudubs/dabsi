import { useEffect, useState } from "react";
import { ActionType, useActionManager } from "./ActionManager";

export function useEmitted<T>(
  actionType: ActionType<T>,
  callback?: (action: T) => void
): T | undefined {
  const am = useActionManager();
  const [state, setState] = useState(() => am.actionMap.get(actionType));
  useEffect(
    () =>
      am.listen(actionType, action => {
        if (action != state) {
          setState(action);
          callback?.(action);
        }
      }),
    [am]
  );

  return state;
}
