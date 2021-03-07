import { Store } from "@dabsi/store";
import { RouterLocationEvent, RouterViewEvent } from "@dabsi/typerouter/event";
import { AnyRouterLocation, RouterLocation } from "@dabsi/typerouter/location";
import { getRouteByPath, Route } from "@dabsi/typerouter/route";
import { AnyRouter } from "@dabsi/typerouter/router";
import { RouterViewContext } from "@dabsi/typerouter/view/context";
import { loadRoute } from "@dabsi/typerouter/view/loadRoute";
import { ViewState } from "@dabsi/view/react/component/decorators/ViewState";
import { View } from "@dabsi/view/react/component/View";
import { useEmittedStateless } from "@dabsi/view/react/reactor/useEmittedStateless";
import { Emitter, useEmitter } from "@dabsi/view/react/reactor/useEmitter";
import { History } from "history";
import React, { createElement, useEffect } from "react";
import { useHistory } from "../History";

export type RouterViewComponentProps = {
  renderNoRoute: (route: Route) => React.ReactElement;
  renderLoading?: (
    currentElement: React.ReactElement | null
  ) => React.ReactElement;
  router: AnyRouter;
};

class RouterViewInstance extends View<
  {
    history: History;
    emit: Emitter;
  } & RouterViewComponentProps
> {
  @ViewState()
  currentRoute: Route = this.getRouteByHistory();

  @ViewState()
  currentRouteElement: null | React.ReactElement = null;

  @ViewState()
  loadingRoute: Route | null = null;

  componentDidMount() {
    super.componentDidMount();
    this.pushRouteByHistory();
  }

  pushLocation(
    location: AnyRouterLocation,
    redirectionLocation?: AnyRouterLocation
  ) {
    if (
      this.currentRoute &&
      location.root.router === this.props.router &&
      location.path !== this.currentRoute.location.path
    ) {
      let { path } = location;
      if (redirectionLocation) {
        path += `?redirection=${encodeURIComponent(
          JSON.stringify({
            type: "location",
            path: redirectionLocation.path,
          })
        )}`;
      }
      this.props.history.push(path);

      this.pushRoute({
        type: "INDEX",
        location,
        path: location.path,
      });
    }
  }

  protected _pushCounter = 0;

  async pushRoute(route: Route) {
    const id = ++this._pushCounter;

    const hasNewPush = () => this._pushCounter !== id;
    this.loadingRoute = route;
    const element = await loadRoute(route, this.locationStore);
    if (hasNewPush()) return;
    this.currentRoute = route;
    this.loadingRoute = null;
    this.currentRouteElement = element;
  }

  pushRouteByHistory() {
    return this.pushRoute(this.getRouteByHistory());
  }

  locationStore = new Store<Record<string, any>>(
    () => {
      return typeof this.props.history.location.state === "object"
        ? (this.props.history.location.state as any)
        : {};
    },
    state => {
      this.props.history.replace(this.props.history.location.pathname, state);
    }
  );

  getRouteByHistory() {
    return getRouteByPath(
      RouterLocation.create(this.props.router, this.props.emit),
      this.props.history.location.pathname
    );
  }

  renderView(): React.ReactElement {
    if (this.loadingRoute && this.props.renderLoading) {
      return this.props.renderLoading(this.currentRouteElement);
    }
    if (!this.currentRouteElement && this.props.renderNoRoute) {
      return this.props.renderNoRoute!(this.currentRoute);
    }
    return createElement(RouterViewContext.Provider, {
      value: {
        route: this.currentRoute,
        router: this.props.router,
        history: this.props.history,
      },
      children: this.currentRouteElement,
    });
  }

  handleLoactionState(state: History.LocationState) {
    if (
      this.props.history.location.pathname !== this.currentRoute.location.path
    ) {
      this.pushRouteByHistory();
    }
  }
}

export function RouterViewComponent(props: RouterViewComponentProps) {
  const instanceRef = React.useRef<RouterViewInstance | null>(null);

  const history = useHistory();

  useEmittedStateless(RouterLocationEvent, callback => {
    callback(instanceRef.current!.currentRoute.location!);
  });

  useEmittedStateless(
    RouterViewEvent,
    event => {
      const instance = instanceRef.current!;
      switch (event.type) {
        case "push":
          let location: AnyRouterLocation =
            event.location || instance.currentRoute.location;

          if (event.router) {
            location = location.find(event.router)!;
            if (!location) {
              throw new Error("No found router at location.");
            }
          }

          instance.pushLocation(location, event.redirection?.location);
          break;
      }
    },
    []
  );

  useEffect(
    () =>
      history.listen(locationState => {
        instanceRef.current!.handleLoactionState(locationState);
      }),
    [history]
  );

  return React.createElement(RouterViewInstance, {
    ...props,
    ref: instanceRef,
    history,
    emit: useEmitter(),
  });
}
