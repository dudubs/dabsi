import { createBrowserHistory } from "history";
import React, { useEffect } from "react";
import { createMuiSystem } from "../../browser/mui/createMuiSystem";
import { useEmitter } from "../../react/reactor/useEmitter";
import { ReactRouterView } from "../../typerouter/ReactRouterView";
import { SystemLoginInfo } from "./index";
import { LoginInfoEvent } from "./LoginInfoEvent";
import { MuiSystemView } from "./MuiSystemView";
import { SystemRouter } from "./SystemRouter";

const { Provider: MuiSystemProvider } = createMuiSystem();
const history = createBrowserHistory();

MuiSystemView(SystemRouter);

export function MuiSystemRootView() {
  const emit = useEmitter();

  useEffect(() => {
    SystemLoginInfo.then(loginInfo => {
      console.log({ loginInfo });
      emit(new LoginInfoEvent(loginInfo));
    });
  }, []);

  return (
    <MuiSystemProvider>
      <ReactRouterView history={history} router={SystemRouter} />
    </MuiSystemProvider>
  );
}
