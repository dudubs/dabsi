import { MuiProvider } from "@dabsi/browser/mui/MuiSystem";
import { useMuiSystemView } from "@dabsi/system/core/browser/useMuiSystemView";
import { SystemRouter } from "@dabsi/system/core/common/router";
import { HistoryProvider } from "@dabsi/typerouter/History";
import { RouterView } from "@dabsi/typerouter/view";
import { ReactWrapper } from "@dabsi/view/react/wrapper";
import Typography from "@material-ui/core/Typography";
import { createBrowserHistory } from "history";
import React from "react";

const history = createBrowserHistory();

export function MuiSystemView() {
  return ReactWrapper(() => {
    ReactWrapper.push(children => (
      <HistoryProvider history={history} children={children} />
    ));

    ReactWrapper.push(children => <MuiProvider children={children} />);

    useMuiSystemView();

    return (
      <RouterView
        router={SystemRouter}
        renderLoading={element => element || <>{lang`LOADING`}</>}
        renderNoRoute={route => (
          <Typography>
            {lang`NO_ROUTE`} {route.type} {route.path}
          </Typography>
        )}
      />
    );
  });
}
