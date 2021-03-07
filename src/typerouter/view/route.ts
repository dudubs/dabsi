import { Awaitable } from "@dabsi/common/typings2/Async";
import { Store } from "@dabsi/store";
import { RouterLocation } from "@dabsi/typerouter/location";
import { Route } from "@dabsi/typerouter/route";
import { TRouter } from "@dabsi/typerouter/router";

export namespace RouteViewComponent {
  export type Handler<T extends TRouter = any, D = any> = {
    loader?: Loader<T, D>;
    component: Type<T, D>;
  };

  export type Options<T extends TRouter, D> = {
    disableIndex?: boolean;
    wrapper?: boolean;
    errorHandling?: boolean;
    defaultHandling?: boolean;
    debug?: boolean;
  };

  export type Loader<T extends TRouter, D> = (
    params: T["Params"],
    location: RouterLocation<T>
  ) => Awaitable<D>;

  export type Props<T extends TRouter, D> = {
    route: Route;
    location: RouterLocation<T>;
    locationStore: Store<any>;
    data: D;
    children: React.ReactElement | null;
  };

  export type Type<T extends TRouter, D> = React.ComponentType<Props<T, D>>;
}
