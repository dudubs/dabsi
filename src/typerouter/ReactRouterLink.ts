import { ReactElement, useState } from "react";
import { useRoute } from "./ReactRouter";
import { Router, TRouter } from "./Router";
import { RouterLocation } from "./RouterLocation";

export function ReactRouterLink<T extends TRouter>({
  children,
  router,
}: {
  router: Router<T> | (() => Router<T>);

  redirect?: boolean;

  children(props: {
    path: string;
    getLocation: () => RouterLocation<T>;
    push();
    update();
  }): ReactElement;
}): ReactElement {
  const [path, setPath] = useState("");
  const route = useRoute();
  return children({
    path,
    getLocation,
    push() {
      getLocation().push();
    },
    update: () => {
      if (!path) {
        setPath(getLocation()!.path);
      }
    },
  });

  function getLocation(): RouterLocation<any> {
    return route.location.find(
      typeof router === "function" ? router() : router
    )!;
  }
}
