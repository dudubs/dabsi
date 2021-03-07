// import { Fn } from "@dabsi/common/typings2/Fn";
// import { OmitKeys } from "@dabsi/common/typings2/OmitKeys";
// import { WeakId } from "@dabsi/common/WeakId";
// import { Store } from "@dabsi/store";
// import { Router, TRouter } from "@dabsi/typerouter/router";
// import { RouterView, RouterViewOptions } from "@dabsi/typerouter/view";
// import {
//   AnyWidgetConnection,
//   WidgetElementState,
// } from "@dabsi/typerpc/widget/Widget";
// import { WidgetViewProps } from "@dabsi/typerpc/widget/WidgetView";
// import { WidgetViewLoader } from "@dabsi/typerpc/widget/WidgetViewLoader";
// import { ReactWrapper } from "@dabsi/view/react/wrapper";
// import React, { createElement, ReactElement, useMemo } from "react";

// type IndexProps<T extends TRouter> = Parameters<
//   NonNullable<RouterViewOptions<T>["renderIndex"]>
// >[0];

// export type WidgetViewRouterRenderer<
//   T extends TRouter,
//   C extends AnyWidgetConnection
// > = (
//   props: WidgetViewProps<C>,
//   indexProps: IndexProps<T>
// ) => React.ReactElement;

// export type WidgetViewRouterOptions<
//   T extends TRouter,
//   C extends AnyWidgetConnection
// > = {
//   getElementState?: (props: IndexProps<T>) => WidgetElementState<C>;

//   elementState?: WidgetElementState<C>;
// };

// export function WidgetRouterViewOld<
//   T extends TRouter,
//   C extends AnyWidgetConnection
// >(
//   router: Router<T>,
//   connectionOrGetConnection: Exclude<C, Fn> | ((params: T["Params"]) => C),
//   renderer: WidgetViewRouterRenderer<T, C>
// ): void;
// export function WidgetRouterViewOld<
//   T extends TRouter,
//   C extends AnyWidgetConnection
// >(
//   router: Router<T>,
//   connectionOrGetConnection: Exclude<C, Fn> | ((params: T["Params"]) => C),
//   options: WidgetViewRouterOptions<T, C>,
//   renderer: WidgetViewRouterRenderer<T, C>
// ): void;
// export function WidgetRouterView.define(
//   router,
//   connectionOrGetConnection,
//   rendererOrOptions,
//   maybeRenderer?
// ) {
//   const getConnection =
//     typeof connectionOrGetConnection === "function"
//       ? connectionOrGetConnection
//       : () => connectionOrGetConnection;

//   const [renderer, options] =
//     typeof rendererOrOptions === "function"
//       ? [rendererOrOptions, {}]
//       : [maybeRenderer, rendererOrOptions];

//   const Component = ({ props, indexProps }) =>
//     ReactWrapper(() => renderer(props, indexProps));

//   // RouterView.define(router, {
//   //   ...options,
//   //   renderIndex(indexProps) {
//   //     const connection = useMemo(
//   //       () => getConnection(indexProps.location.params),
//   //       [indexProps.location.params]
//   //     );
//   //     return (
//   //       <WidgetViewLoader
//   //         key={WeakId(indexProps.location)}
//   //         elementState={options.elementState || indexProps.state}
//   //         onElementStateChange={state => {
//   //           indexProps.setState(state);
//   //         }}
//   //         connection={connection}
//   //         children={props => createElement(Component, { props, indexProps })}
//   //       />
//   //     );
//   //   },
//   // });
// }

// export namespace WidgetRouterViewOld {
//   export function defineWrapper(router, connectionOrGetConnection) {
//     const connection = typeof connectionOrGetConnection === "function";
//   }
// }
