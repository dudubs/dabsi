import { Store } from "@dabsi/store";
import { RouterLocationEvent, RouterViewEvent } from "@dabsi/typerouter/event";
import { useHistory } from "@dabsi/typerouter/History";
import { AnyRouter } from "@dabsi/typerouter/router";
import { RouterViewContext } from "@dabsi/typerouter/view/context";
import { getRouteByHistory } from "@dabsi/typerouter/view/getRouteByHistory";
import { renderRoute } from "@dabsi/typerouter/view/renderRoute";
import { useEmitted } from "@dabsi/view/react/reactor/useEmitted";
import { useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import { History } from "history";
import React from "react";

export type RouterViewProps = {
  noRouteElement?: React.ReactElement;

  router: AnyRouter;
};

export function BaseRouterView({
  router,
  noRouteElement = EmptyFragment,
}: RouterViewProps): React.ReactElement {
  const history = useHistory();
  const emit = useEmitter();

  const [route, setRoute] = React.useState(() =>
    getRouteByHistory(history, router, emit)
  );

  React.useEffect(
    () =>
      history.listen(() => {
        setRoute(getRouteByHistory(history, router, emit));
      }),
    [history]
  );

  useEmitted(RouterLocationEvent, callback => {
    callback(route.location);
  });
  useEmitted(
    RouterViewEvent,
    event => {
      switch (event.type) {
        case "push":
          {
            let location = event.location || route.location;
            if (event.router) {
              location = location.find(event.router)!;
              if (!location) {
                throw new Error("Not found location for router.");
              }
            }
            if (location.root.router !== router) return;
            if (location.path === route.location.path) return;
            history.push(location.path);
          }
          break;
      }
    },
    [route, history]
  );

  return React.createElement(RouterViewContext.Provider, {
    value: {
      route,
      router,
      history,
    },
    children: renderRoute(
      // /
      route,
      Store.const({}),
      noRouteElement
    ),
  });
}

function useHistoryStore(history: History) {
  return new Store(
    () => {
      return (history.location.state as any)?.__ROUTER_STATE || {};
    },
    state => {
      history.replace(history.location.pathname, {
        ...(typeof history.location.state === "object"
          ? history.location.state
          : null),

        __ROUTER_STATE: state,
      });
    }
  );
}
