import BrowserHistory from "@dabsi/browser/BrowserHistory";
import { RouterView, RouterViewProps } from "@dabsi/typerouter/view/RouterView";
import React from "react";

export function RouterBrowserView(p: Omit<RouterViewProps, "history">) {
  return React.createElement(RouterView, {
    ...p,
    history: BrowserHistory,
  });
}
