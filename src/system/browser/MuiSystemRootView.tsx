import { createBrowserHistory } from "history";
import React, { useEffect } from "react";
import { createMuiSystem } from "../../browser/mui/createMuiSystem";
import { MuiAdmin } from "../../browser/mui/MuiAdmin";
import { useEmitter } from "../../react/reactor/useEmitter";
import { ReactRouterView } from "../../typerouter2/ReactRouterView";
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

const Test = () => (
  <MuiAdmin
    menu={{
      home: {
        icon: require("@material-ui/icons/Home"),
      },
      acl: {
        // icon: require("@material-ui/icons/Home"),
        children: {
          users: {
            children: {
              add: { icon: require("@material-ui/icons/PersonAdd") },
            },
          },
          groups: {
            icon: require("@material-ui/icons/People"),
            children: {
              add: { icon: require("@material-ui/icons/GroupAdd") },
            },
          },
        },
      },
      outbox: {
        icon: require("@material-ui/icons/Send"),
      },
      favorites: {
        icon: require("@material-ui/icons/Favorite"),
      },
      archive: {
        icon: require("@material-ui/icons/Archive"),
      },
      trash: {
        icon: require("@material-ui/icons/Delete"),
      },
      spam: {
        icon: require("@material-ui/icons/Error"),
      },
    }}
  />
);
