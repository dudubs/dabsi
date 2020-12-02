import { createBrowserHistory } from "history";
import React, { useEffect } from "react";
import { ReactRouter } from "../../typerouter/ReactRouter";
import { SystemLoginInfo } from "./index";
import { SystemRouter } from "./SystemRouter";

const history = createBrowserHistory();

export function MuiSystemView() {
  useEffect(() => {
    SystemLoginInfo.then(loginInfo => {
      console.log({ loginInfo });
    });
  }, []);

  return <ReactRouter history={history} router={SystemRouter} />;
}
