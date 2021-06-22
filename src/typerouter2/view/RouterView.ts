import { Router, RouterType } from "@dabsi/typerouter2/Router";
import {
  BaseRouterView,
  BaseRouterViewProps,
} from "@dabsi/typerouter2/view/BaseRouterView";
import RouterViewBuilder from "@dabsi/typerouter2/view/RouterViewBuilder";
import { History } from "history";
import React from "react";

export type RouterViewProps = Omit<BaseRouterViewProps, "path" | "map"> & {
  history: History;
};

let _buildCallbacks: (() => void)[] = [];

RouterView.build = function () {
  while (_buildCallbacks.length) {
    const callbacks = _buildCallbacks;
    _buildCallbacks = [];
    for (const callback of callbacks) {
      callback();
    }
  }
};

export function RouterView<T extends Router>(
  routerType: RouterType<T>,
  callback: (builder: RouterViewBuilder<T, T, {}>) => any
): void;

export function RouterView(props: RouterViewProps): React.ReactElement;

export function RouterView(rotuerTypeOrProps, callback?): any {
  if (typeof rotuerTypeOrProps === "function") {
    const routerType = rotuerTypeOrProps;
    _buildCallbacks.push(() => {
      callback(new RouterViewBuilder(routerType, 0));
    });
    return;
  }

  RouterView.build();

  const { history, ...props } = rotuerTypeOrProps as RouterViewProps;

  const [path, setPath] = React.useState(() => history.location.pathname);

  React.useEffect(
    () =>
      history.listen(event => {
        setPath(event.location.pathname);
      }),
    [history]
  );

  return BaseRouterView({
    ...props,
    path,
    setPath(path) {
      history.push({ pathname: path, search: "", hash: "" });
    },
  });
}
