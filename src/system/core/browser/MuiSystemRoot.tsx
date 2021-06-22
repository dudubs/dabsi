import BrowserHistory from "@dabsi/browser/BrowserHistory";
import { MuiProvider } from "@dabsi/browser/mui/MuiSystem";
import MuiSystemBuilder from "@dabsi/system/core/browser/MuiSystemBuilder";
import SystemRouter from "@dabsi/system/core/view/SystemRouter";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import { createBrowserHistory } from "history";
import React from "react";

export function MuiSystemRoot(): React.ReactElement {
  return (
    <MuiProvider>
      <SystemView build={MuiSystemBuilder}>
        <RouterView routerType={SystemRouter} history={BrowserHistory} />
      </SystemView>
    </MuiProvider>
  );
}
