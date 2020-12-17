import { RouterEvent } from "@dabsi/typerouter/RouterEvent";
import { useState } from "react";
import { useEmitter } from "@dabsi/react/reactor/useEmitter";
import { useReactRouter } from "@dabsi/typerouter/ReactRouter";
import { AnyRouter } from "@dabsi/typerouter/Router";

export default function (getRouter: () => AnyRouter) {
  const [path, setPath] = useState(() => "#");
  const emit = useEmitter();
  const {
    route: { location },
  } = useReactRouter();

  return {
    path,
    push() {
      emit(RouterEvent, {
        type: "push",
        location: findLocation(),
      });
    },
    update() {
      if (path !== "#") {
        setPath(findLocation().path);
      }
    },
  };

  function findLocation() {
    return location.find(getRouter())!;
  }
}
