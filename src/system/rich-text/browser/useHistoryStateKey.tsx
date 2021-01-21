import { useHistory } from "@dabsi/typerouter/History";

export function useHistoryStateKey<T = any>(
  key: string
): [T | undefined, (value: T) => void] {
  const history = useHistory();
  return [
    history.location.state?.[key],
    value => {
      history.push(history.location.pathname, {
        ...(typeof history.location.state === "object"
          ? history.location.state
          : null),
        [key]: value,
      });
    },
  ];
}
