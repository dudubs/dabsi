import { useActionManager } from "./ActionManager";

export function useEmitter() {
  const am = useActionManager();
  return action => {
    am.emit(action);
  };
}
