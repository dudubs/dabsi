import Router, { TRouter } from "@dabsi/typerouter/router";
import {
  RouterViewComponent,
  RouterViewComponentProps,
} from "@dabsi/typerouter/view/component";
import { getRouterViewMetadata } from "@dabsi/typerouter/view/metadata";
import { RouteViewComponent } from "@dabsi/typerouter/view/route";

export function RouterView(
  props: RouterViewComponentProps
): React.ReactElement {
  return RouterViewComponent(props);
}

export namespace RouterView {
  export const define = ((...args) => {
    const {
      options: {
        wrapper = false,
        disableIndex = wrapper,
        errorHandling = false,
        defaultHandling = false,
      },
      router,
      metadata,
      loader,
      component,
    } = parseArgs<RouteViewComponent.Options<any, any>>(args);

    if (!disableIndex) {
      metadata.indexHandler = { loader, component };
    }

    if (errorHandling) {
      metadata.errorHandler = { loader, component };
    }

    if (defaultHandling) {
      metadata.defaultHandler = { loader, component };
    }

    if (wrapper) {
      metadata.wrappers.push({ loader, component });
    }

    //
  }) as {
    <R extends TRouter>(
      router: Router<R>,
      component: RouteViewComponent.Type<R, never>
    ): void;
    <R extends TRouter, D>(
      router: Router<R>,
      loader: RouteViewComponent.Loader<R, D>,
      component: RouteViewComponent.Type<R, D>
    ): void;
    <R extends TRouter>(
      router: Router<R>,
      options: RouteViewComponent.Options<R, never>,
      component: RouteViewComponent.Type<R, never>
    ): void;
    <R extends TRouter, D>(
      router: Router<R>,
      options: RouteViewComponent.Options<R, D>,
      loader: RouteViewComponent.Loader<R, D>,
      component: RouteViewComponent.Type<R, D>
    ): void;
  };
}

function parseArgs<O>(args) {
  let router;
  let options;
  let loader;
  let component;

  if (args.length === 2) {
    [router, component] = args;
    [options, loader] = [null, null];
  } else if (args.length == 3) {
    let optionsOrLoader;
    [router, optionsOrLoader, component] = args;
    [options, loader] =
      typeof optionsOrLoader === "function"
        ? [null, optionsOrLoader]
        : [optionsOrLoader, null];
  } else if (args.length === 4) {
    [router, options, loader, component] = args;
  }

  return {
    metadata: getRouterViewMetadata(router),
    router,
    options: (options || {}) as O,
    loader,
    component,
  };
}
