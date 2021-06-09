import { MuiProvider } from "@dabsi/browser/mui/MuiSystem";
import MuiSystemViewBuilder from "@dabsi/system/core/browser/MuiSystemViewBuilder";
import SystemRouter from "@dabsi/system/core/view/SystemRouter";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import { createBrowserHistory } from "history";
import React from "react";

const history = createBrowserHistory();

export function MuiSystemRoot(): React.ReactElement {
  return (
    <MuiProvider>
      <SystemView build={MuiSystemViewBuilder}>
        <RouterView routerType={SystemRouter} history={history} />
      </SystemView>
    </MuiProvider>
  );
}
