import { useMemo, useState } from "react";
import { Debounce } from "@dabsi/common/async/Debounce";

import { Store } from "@dabsi/store";
import { AsField } from "@dabsi/struct";
import { Field, AsFieldType } from "@dabsi/struct/Field";
import { useHistory } from "@dabsi/typerouter/History";

const STORE_STATE = "STORE_STATE";

export function useLocationStore<T extends AsField<any>>(
  key: string,
  fieldInput: T
): Store<AsFieldType<T>> {
  const { debounce, field } = useMemo(() => {
    return { debounce: Debounce(500), field: Field(fieldInput) };
  }, [fieldInput]);
  const history = useHistory();

  const [state, setState] = useState(() => {
    const locationState = (history.location.state as any)?.[STORE_STATE]?.[key];
    return field.unpack(locationState);
  });

  return new Store(state, getNextState => {
    setState(prevState => {
      const nextState = getNextState(prevState);
      debounce().then(update => {
        if (update) {
          const prevLocationState =
            typeof history.location.state === "object"
              ? history.location.state
              : null;

          history.replace(history.location.pathname, {
            ...prevLocationState,
            [STORE_STATE]: {
              ...prevLocationState?.[STORE_STATE],
              [key]: field.pack(nextState),
            },
          });
        }
      });
      return nextState;
    });
  });
}

// useLocationStore(myStore, "")
