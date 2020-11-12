import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { RpcError } from "../../typerpc/Rpc";
import { UserApp } from "../common/UserApp";
import { DataContext } from "../../typedata/DataContext";
import { SystemSession } from "./SystemSession";

export const UserAppConfig = RpcConfigResolver(
  UserApp,
  {
    ...DataContext({
      session: [SystemSession],
    }),
  },
  c => $ => {
    if (!c.session.user) throw new RpcError(`USER_SECURE`);

    return $({
      async foo() {},
    });
  }
);
