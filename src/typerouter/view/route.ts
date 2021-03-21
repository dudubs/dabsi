import { Store } from "@dabsi/store";
import { RouterLocation } from "@dabsi/typerouter/location";
import { Route } from "@dabsi/typerouter/route";
import { TRouter } from "@dabsi/typerouter/router";

export namespace RouteViewComponent {
  export type Handler<T extends TRouter = any> = {
    component: Type<T>;
  };

  export type Options<T extends TRouter> = {
    disableIndex?: boolean;
    wrapper?: boolean;
    errorHandling?: boolean;
    defaultHandling?: boolean;
    debug?: boolean;
  };

  export type Props<T extends TRouter> = {
    route: Route;
    location: RouterLocation<T>;
    locationStore: Store<any>;
    children: React.ReactElement | null;
    useParams: <U>(callback: (params: T["Params"]) => U, deps?: any[]) => U;
  };

  export type Type<T extends TRouter> = React.ComponentType<Props<T>>;
}
