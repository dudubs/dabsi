import { createBrowserHistory } from "history";
import React from "react";
import { MuiProvider } from "../../../browser/mui/MuiSystem";
import { MuiSystemProvider } from "../../../browser/mui/MuiSysteThemeProvider";
import { ReactRouter } from "../../../typerouter/ReactRouter";
import { SystemRouter } from "../common/SystemRouter";
const history = createBrowserHistory();

export function MuiSystemView() {
  return (
    <MuiProvider>
      <MuiSystemProvider>
        <ReactRouter router={SystemRouter} history={history} />
      </MuiSystemProvider>
    </MuiProvider>
  );
}
