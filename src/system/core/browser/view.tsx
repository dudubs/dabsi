import { MuiProvider } from "@dabsi/browser/mui/MuiSystem";
import { useSystemBrowserMui } from "@dabsi/system/core/browser/useMui";
import { SystemRouter } from "@dabsi/system/core/common/router";
import { HistoryProvider } from "@dabsi/typerouter/History";
import { RouterView } from "@dabsi/typerouter/view";
import { ReactWrapper } from "@dabsi/view/react/wrapper";
import Typography from "@material-ui/core/Typography";
import { createBrowserHistory } from "history";
import React from "react";

const history = createBrowserHistory();

export function MuiSystemView(): React.ReactElement {
  return ReactWrapper(() => {
    ReactWrapper.push(children => (
      <HistoryProvider history={history} children={children} />
    ));

    ReactWrapper.push(children => <MuiProvider children={children} />);

    useSystemBrowserMui();

    return (
      <RouterView
        router={SystemRouter}
        noRouteElement={<Typography>{lang`NO_ROUTE`}</Typography>}
      />
    );
  });
}
