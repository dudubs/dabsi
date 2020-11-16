import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { RpcError } from "../../typerpc/Rpc";
import { UserApp } from "../common/UserApp";
import { DataResolvers } from "../../typedata/DataResolvers";
import { SystemSession } from "./SystemSession";

export const UserAppConfig = RpcConfigResolver(
  UserApp,
  {
    ...DataResolvers({
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
