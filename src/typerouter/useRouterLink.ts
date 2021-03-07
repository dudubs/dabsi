import { AnyRouter } from "@dabsi/typerouter/router";
import { useRoute } from "@dabsi/typerouter/view/context";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import { useState } from "react";
import { RouterViewEvent } from "./event";

export default function (getRouter: () => AnyRouter) {
  const [path, setPath] = useState(() => "#");
  const emit = useEmitter();
  const route = useRoute();

  return {
    path,
    push() {
      emit(RouterViewEvent, {
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
    return route.location.find(getRouter())!;
  }
}
