import Router, { TRouter } from "@dabsi/typerouter/router";
import { getRouterViewMetadata } from "@dabsi/typerouter/view/metadata";
import {
  renderRouterView,
  RouterViewProps,
} from "@dabsi/typerouter/view/render";
import { RouteViewComponent } from "@dabsi/typerouter/view/route";
import { ReactWrapper } from "@dabsi/view/react/wrapper";
import React from "react";

export function RouterView(props: RouterViewProps): React.ReactElement {
  return renderRouterView(props);
}

function isComponentFunction(
  component: React.ComponentType<any>
): component is (props: any) => React.ReactElement {
  return (
    !component.prototype || !(component.prototype instanceof React.Component)
  );
}
export namespace RouterView {
  export const define = ((...args) => {
    let {
      options: {
        wrapper = false,
        disableIndex = wrapper,
        errorHandling = false,
        defaultHandling = false,
        disableReactWrapper = false,
      },
      metadata,
      component,
    } = parseArgs<RouteViewComponent.Options<any>>(args);

    if (!disableReactWrapper && isComponentFunction(component)) {
      const render = component;
      component = props => ReactWrapper(() => render(props));
    }

    if (!disableIndex) {
      metadata.indexHandler = { component };
    }

    if (errorHandling) {
      metadata.errorHandler = { component };
    }

    if (defaultHandling) {
      metadata.defaultHandler = { component };
    }

    if (wrapper) {
      metadata.wrappers.push({ component });
    }

    //
  }) as {
    <R extends TRouter>(
      router: Router<R>,
      component: RouteViewComponent.Type<R>
    ): void;
    <R extends TRouter>(
      router: Router<R>,
      options: RouteViewComponent.Options<R>,
      component: RouteViewComponent.Type<R>
    ): void;
    <R extends TRouter>(
      router: Router<R>,
      options: RouteViewComponent.Options<R>,
      component: RouteViewComponent.Type<R>
    ): void;
  };
}

function parseArgs<O>(args) {
  let router;
  let options;
  let component;

  if (args.length === 2) {
    [router, component] = args;
    [options] = [null];
  } else if (args.length == 3) {
    [router, options, component] = args;
  }

  return {
    metadata: getRouterViewMetadata(router),
    router,
    options: (options || {}) as O,
    component,
  };
}
