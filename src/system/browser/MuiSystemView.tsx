import { createBrowserHistory } from "history";
import React, { useEffect } from "react";
import { createMuiSystem } from "../../browser/mui/createMuiSystem";
import { MuiAdmin } from "../../browser/mui/MuiAdmin";
import { useEmitter } from "../../react/useEmitter";
import { ReactRouterContentView } from "../../typerouter/ReactRouterContentView";
import { ReactRouterView } from "../../typerouter/ReactRouterView";
import { SystemApp } from "../common/SystemApp";
import { AdminRouterPlugin } from "./admin/SystemAdminRouter";
import { LoginInfo } from "./LoginInfo";
import { SystemRouter } from "./SystemRouter";

const { Provider: MuiSystemProvider } = createMuiSystem();
const history = createBrowserHistory();
const currentLoginInfo = SystemApp.service.getLoginInfo();

const plugins = [
  SystemRouter.at("admin").plugin((r, c) => {
    AdminRouterPlugin(r, c);
  }),
];

export function MuiSystemView() {
  const emit = useEmitter();

  // emit(LoginInfo, {})

  useEffect(() => {
    currentLoginInfo.then(loginInfo => {
      emit(new LoginInfo(loginInfo));
    });
  }, []);

  void (
    <MuiSystemProvider>
      <ReactRouterView
        history={history}
        router={SystemRouter}
        plugins={plugins}
      >
        <ReactRouterContentView />
      </ReactRouterView>
    </MuiSystemProvider>
  );

  return (
    <MuiAdmin
      menu={{
        test: {
          title: "TestTitle",
          icon: require("@material-ui/icons/Add"),
          children: {
            foo: {
              children: {
                hello: {},
                world: {},
              },
            },
            bar: {},
          },
        },
      }}
    />
  );
}

/*

SystemPlugin({


})
 */
