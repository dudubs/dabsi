import { createBrowserHistory } from "history";
import React from "react";
import { MuiProvider } from "../../../browser/mui/MuiSystem";
import { MuiSystemProvider } from "../../../browser/mui/MuiSysteThemeProvider";
import { HistoryProvider } from "../../../typerouter/History";
import { ReactRouter } from "../../../typerouter/ReactRouter";
import { SystemRouter } from "../common/SystemRouter";
const history = createBrowserHistory();

export function MuiSystemView() {
  return (
    <HistoryProvider history={history}>
      <MuiProvider>
        <MuiSystemProvider>
          <ReactRouter router={SystemRouter} />
        </MuiSystemProvider>
      </MuiProvider>
    </HistoryProvider>
  );
}
