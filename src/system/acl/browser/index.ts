import "./MuiLoginRouterView";
import { RootReactor } from "../../../react/reactor/Reactor";
import { AclConnection, LoginInfoEvent } from "../common";

AclConnection.getLoginInfo().then(loginInfo => {
  RootReactor.emit(LoginInfoEvent, loginInfo);
});
