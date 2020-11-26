import { createBrowserHistory } from "history";
import React, { useEffect } from "react";
import { useEmitter } from "../../react/reactor/useEmitter";
import { ReactRouter } from "../../typerouter/ReactRouter";
import { SystemLoginInfo } from "./index";
import { LoginInfoEvent } from "./LoginInfoEvent";
import { MuiSystemView } from "./MuiSystemView";
import { SystemRouter } from "./SystemRouter";

const history = createBrowserHistory();

MuiSystemView(SystemRouter);

export function MuiSystemRootView() {
  const emit = useEmitter();

  useEffect(() => {
    SystemLoginInfo.then((loginInfo) => {
      console.log({ loginInfo });
      emit(new LoginInfoEvent(loginInfo));
    });
  }, []);

  return <ReactRouter history={history} router={SystemRouter} />;
}
