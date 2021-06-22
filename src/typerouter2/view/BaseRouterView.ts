import { RouterType } from "@dabsi/typerouter2/Router";
import {
  RouterLocation,
  RouterLocationPath,
} from "@dabsi/typerouter2/RouterLocation";
import useRouterViewComponent from "@dabsi/typerouter2/view/useRouterViewComponent";
import ViewContext from "@dabsi/view/react/ViewContext";
import React from "react";
import RouterViewNavigator from "./RouterViewNavigator";

// BrowserRouterView...
export type BaseRouterViewProps = {
  routerType: RouterType;
  path: string;
  setPath?(path: string): void;
};

export function BaseRouterView(p: BaseRouterViewProps) {
  const createState = () => ({
    originalPath: p.path,
    locationPath: RouterLocation.parse(p.routerType, p.path),
  });

  const [state, setState] = React.useState(createState);

  const setLocationPath = (locationPath: RouterLocationPath) => {
    setState({ originalPath: locationPath.location.path, locationPath });
  };

  const { locationPath } = state;

  React.useEffect(() => {
    if (p.path !== state.originalPath) {
      setState(createState());
    }
  }, [p.path]);

  const navigator = React.useMemo(
    () =>
      new RouterViewNavigator(
        location => {
          setLocationPath({ type: "index", location });
          p.setPath?.(location.path);
        },
        () => locationPath.location
      ),
    [locationPath]
  );

  const component = useRouterViewComponent(
    p.routerType,
    locationPath,
    navigator
  );

  return React.createElement(ViewContext.Provider, {
    deps: [locationPath, navigator],
    entries: [
      [RouterLocation, locationPath.location],
      [RouterViewNavigator, navigator],
    ],
    children: React.createElement(component),
  });
}
