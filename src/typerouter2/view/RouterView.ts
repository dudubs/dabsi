import { Router, RouterType } from "@dabsi/typerouter2/Router";
import {
  BaseRouterView,
  BaseRouterViewProps,
} from "@dabsi/typerouter2/view/BaseRouterView";
import RouterViewBuilder from "@dabsi/typerouter2/view/RouterViewBuilder";
import { History } from "history";
import React from "react";

export type RouterViewProps = Omit<BaseRouterViewProps, "path" | "map"> & {
  history: History;
};

let _buildCallbacks: (() => void)[] = [];

RouterView.build = function () {
  while (_buildCallbacks.length) {
    const callbacks = _buildCallbacks;
    _buildCallbacks = [];
    for (const callback of callbacks) {
      callback();
    }
  }
};

export function RouterView<T extends Router>(
  routerType: RouterType<T>,
  callback: (builder: RouterViewBuilder<T, T, {}>) => any
): void;
export function RouterView(props: RouterViewProps): React.ReactElement;

export function RouterView(rotuerTypeOrProps, callback?): any {
  if (typeof rotuerTypeOrProps === "function") {
    const routerType = rotuerTypeOrProps;
    _buildCallbacks.push(() => {
      callback(new RouterViewBuilder(routerType, 0));
    });
    return;
  }
  RouterView.build();

  const { history, ...props } = rotuerTypeOrProps as RouterViewProps;

  const [path, setPath] = React.useState(() => history.location.pathname);

  React.useEffect(
    () =>
      history.listen(event => {
        setPath(event.location.pathname);
      }),
    [history]
  );

  return BaseRouterView({
    ...props,
    path,
    setPath(path) {
      history.push(path);
    },
  });
}

// export type RouterChildRendererMap<T extends Router, S, R extends Router> =
//   //
//   IsNever<RouterChildKey<T>> extends true
//     ? never
//     : {
//         [K in RouterChildKey<T>]?: RendererOrObject<
//           RouterChildRenderer<
//             T[K],
//             //
//             RouterViewStackWithChild<T[K], K, S>,
//             R
//           >,
//           | RouterChildRendererMap<
//               InferredRouterChildRouter<T[K]>,
//               RouterViewStackWithChild<T[K], K, S>,
//               R
//             >
//           | {
//               $wrapper: RouterChildRenderer<
//                 T[K],
//                 RouterViewStackWithChild<T[K], K, S>,
//                 R
//               >;
//             }
//         >;
//       } & {
//         $wrapper?: RouterChildRendererMap<T, {}, R>;
//       };

// export namespace RouterView {
//   function createRendererComponent(
//     renderer: RouterViewRenderer<any, any, any>
//   ) {
//     return props => React.createElement(renderer, props);
//   }

//   export function define<T extends Router>(
//     routerType: RouterType<T>,
//     options: RendererOrObject<
//       RouterViewRenderer<T, {}, T>,
//       | RouterChildRendererMap<T, {}, T>
//       | {
//           $wrapper: RouterViewRenderer<T, {}, T>;
//         }
//     >
//   );

//   export function define(routerType, options) {
//     buildRouterViews.builders.push(() => {
//       define(routerType, options, 0);

//       function define(routerType, options, depth) {
//         if (Array.isArray(options)) {
//           for (const arg of options) {
//             define(routerType, arg, depth);
//           }
//           return;
//         }

//         const children = getRouterMetadata(routerType);

//         if (typeof options.$wrapper === "function") {
//           getRouterViewRenderers(routerType).wrappers.push({
//             renderer: options.$wrapper,
//             depth,
//           });
//           return;
//         }

//         if (typeof options !== "function") {
//           for (const [childPropertyName, childOptions] of entries(options)) {
//             const childMetadata = defined(
//               children.routePropertyMap[childPropertyName],
//               () =>
//                 `No router child like "${routerType.name}.${childPropertyName}".`
//             );
//             define(childMetadata.type, childOptions, depth + 1);
//           }
//           return;
//         }

//         getRouterViewRenderers(routerType).index.push({
//           renderer: createRendererComponent(options),
//           depth,
//         });
//       }
//     });
//   }
// }
