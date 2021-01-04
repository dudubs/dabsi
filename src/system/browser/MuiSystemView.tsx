import { MuiProvider } from "@dabsi/browser/mui/MuiSystem";
import { useProvider } from "@dabsi/react/useProvider";
import { useMuiSystemViewTheme } from "@dabsi/system/browser/useMuiSystemViewTheme";
import SystemRouter from "@dabsi/system/common/SystemRouter";
import { HistoryProvider } from "@dabsi/typerouter/History";
import { ReactRouter } from "@dabsi/typerouter/ReactRouter";
import { createBrowserHistory } from "history";
import React from "react";

const history = createBrowserHistory();

export function MuiSystemView() {
  const provider = useProvider();

  useProvider(children => (
    <HistoryProvider history={history} children={children} />
  ));

  useProvider(children => <MuiProvider children={children} />);

  useMuiSystemViewTheme();
  return provider(<ReactRouter router={SystemRouter} />);
}
