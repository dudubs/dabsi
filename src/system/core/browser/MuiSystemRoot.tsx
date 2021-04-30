import { MuiProvider } from "@dabsi/browser/mui/MuiSystem";
import SystemRouter from "@dabsi/system/core/view/SystemRouter";
import { HistoryProvider } from "@dabsi/typerouter/History";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import { ReactWrapper } from "@dabsi/view/react/ReactWrapper";
import { createBrowserHistory } from "history";
import React from "react";

const history = createBrowserHistory();

export const MuiSystemHooks: (() => void)[] = [];

export function MuiSystemRoot(): React.ReactElement {
  return ReactWrapper(() => {
    ReactWrapper.push(
      element => <HistoryProvider history={history}>{element}</HistoryProvider>,
      element => <MuiProvider>{element}</MuiProvider>
    );

    for (const hook of MuiSystemHooks) {
      hook();
    }

    return <RouterView routerType={SystemRouter} history={history} />;
  });
}
