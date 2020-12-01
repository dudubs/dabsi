import { createBrowserHistory } from "history";
import React from "react";
import { MuiSystem } from "../../../browser/mui/MuiSystem";
import { ReactRouter } from "../../../typerouter/ReactRouter";
import { SystemRouter } from "../common/SystemRouter";
const history = createBrowserHistory();

export function MuiSystemView() {
  return (
    <MuiSystem>
      <ReactRouter router={SystemRouter} history={history} />
    </MuiSystem>
  );
}
