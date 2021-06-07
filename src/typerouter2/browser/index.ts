import {
  RouterView,
  RouterViewProps,
} from "@dabsi/typerouter2/view/RouterView";
import { createBrowserHistory } from "history";
import React from "react";

const history = createBrowserHistory();

export function RouterBrowserView(p: Omit<RouterViewProps, "history">) {
  return React.createElement(RouterView, {
    ...p,
    history,
  });
}
