import { createBrowserHistory } from "history";
import React from "react";
import { ReactRouter } from "../../../typerouter/ReactRouter";
import { SystemRouter } from "../common/SystemRouter";
const history = createBrowserHistory();

export function SystemView() {
  return <ReactRouter router={SystemRouter} history={history} />;
}
