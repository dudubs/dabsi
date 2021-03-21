import { entries } from "@dabsi/common/object/entries";
import Router, {
  AnyRouter,
  RouterAt,
  RouterType,
  TEmptyRouter,
  TRouter,
  TRouterAt,
} from "@dabsi/typerouter/router";
import {
  getRouterViewMetadata,
  RouterViewMetadata,
} from "@dabsi/typerouter/view/metadata";
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

declare const configureSymbol: unique symbol;

type DefinitionChildren<T extends TRouter> = {
  [K in keyof T["Children"]]?: Definition<TRouterAt<T, K>>;
};
type DefinitionOptions<T extends TRouter> = {
  index?: RouteViewComponent.Type<T>;
  default?: RouteViewComponent.Type<T>;
  error?: RouteViewComponent.Type<T>;
  wrapper?: RouteViewComponent.Type<T>;
  custom?:
    | {
        options: RouteViewComponent.Options<T>;
        component: RouteViewComponent.Type<T>;
      }[]
    | {
        options: RouteViewComponent.Options<T>;
        component: RouteViewComponent.Type<T>;
      };

  children?: DefinitionChildren<T>;

  let?: (
    $: (d: Definition<T>) => typeof configureSymbol,
    router: Router<T>
  ) => typeof configureSymbol;
};
type Definition<T extends TRouter> =
  | RouteViewComponent.Type<T>
  | DefinitionOptions<T>;

type Definer = {
  <T extends AnyRouter>(router: T, definition: Definition<RouterType<T>>): void;
  <T extends AnyRouter>(
    router: T,
    options: RouteViewComponent.Options<RouterType<T>>,
    component: RouteViewComponent.Type<RouterType<T>>
  ): void;
};

function getComponent(component) {
  if (isComponentFunction(component)) {
    return props => ReactWrapper(() => component(props));
  }
  return component;
}

export namespace RouterView {
  function _defineOptions(
    metadata: RouterViewMetadata,
    {
      wrapper = false,
      disableIndex = wrapper,
      errorHandling = false,
      defaultHandling = false,
    }: RouteViewComponent.Options<any>,
    component: RouteViewComponent.Type<any>
  ) {
    component = getComponent(component);

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
  }

  function _define(router: AnyRouter, defintion: Definition<any>) {
    if (!defintion) return;
    const metadata = getRouterViewMetadata(router);

    if (typeof defintion === "function") {
      metadata.indexHandler = { component: getComponent(defintion) };
      return;
    }

    if (Array.isArray(defintion) && defintion.length === 1) {
      const [getDefintion] = defintion;
      defintion = <any>getDefintion(defintion => {
        return defintion as any;
      }, router);

      _define(router, defintion);
      return;
    }

    if (defintion.index) {
      metadata.indexHandler = { component: getComponent(defintion.index) };
    }
    if (defintion.error) {
      metadata.errorHandler = { component: getComponent(defintion.error) };
    }
    if (defintion.default) {
      metadata.defaultHandler = { component: getComponent(defintion.default) };
    }
    if (defintion.wrapper) {
      metadata.wrappers.push({ component: getComponent(defintion.wrapper) });
    }
    if (defintion.let) {
      _define(router, <any>defintion.let($ => <any>$, router));
    }

    if (defintion.custom) {
      for (const { options, component } of Array.isArray(defintion.custom)
        ? defintion.custom
        : [defintion.custom]) {
        _defineOptions(metadata, options, component);
      }
    }
    for (const [childKey, childDefinition] of entries(defintion.children)) {
      const childRouter = router.at(childKey);
      _define(childRouter, childDefinition!);
    }
  }

  export const define = ((...args) => {
    if (args.length === 3) {
      const [router, options, component] = args;
      _defineOptions(getRouterViewMetadata(router), options, component);
      return;
    }

    const [router, defintion] = args;
    _define(router, defintion);
  }) as Definer;
}
