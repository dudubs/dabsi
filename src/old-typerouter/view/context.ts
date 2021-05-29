import { History } from "history";
import { Route } from "@dabsi/typerouter/route";
import Router from "@dabsi/typerouter/router";
import { createUndefinedContext } from "@dabsi/view/react/utils/hooks/createUndefinedContext";
import React from "react";

export type RouterViewContext = {
  route: Route;
  router: Router;
  history: History;
};

export const RouterViewContext = createUndefinedContext<RouterViewContext>();

export const useRoute = (): Route =>
  React.useContext(RouterViewContext)!.route!;
