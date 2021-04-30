import { BaseRouterViewProps } from "@dabsi/typerouter2/view/BaseRouterView";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import { createBrowserHistory } from "history";
import React from "react";

const history = createBrowserHistory();

export function RouterBrowserView(p: Omit<BaseRouterViewProps, "path">) {
  const [path, setPath] = React.useState(() => history.location.pathname);

  React.useEffect(() =>
    history.listen(event => {
      setPath(event.location.pathname);
    })
  );

  return React.createElement(RouterView, {
    ...p,
    path,
  });
}
