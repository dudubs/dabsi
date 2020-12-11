import { RouterEvent } from "./RouterEvent";
import { useState } from "react";
import { useEmitter } from "../react/reactor/useEmitter";
import { useReactRouter } from "./ReactRouter";
import { AnyRouter } from "./Router";

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
