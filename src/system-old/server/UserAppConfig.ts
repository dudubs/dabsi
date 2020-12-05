import { DataRow } from "../../typedata/DataRow";
import { RpcConfigResolver } from "../../typerpc/RpcConfigResolver";
import { RpcError } from "../../typerpc/Rpc";
import { UserApp } from "../common/UserApp";
import { DataResolvers } from "../../typedata/DataResolvers";
import { SystemSession } from "../../system/core/SystemSession";

export const UserAppConfig = RpcConfigResolver(
  UserApp,
  {
    session: DataRow(SystemSession),
  },
  (c) => ($) => {
    if (!c.session.user) throw new RpcError(`USER_SECURE`);

    return $({
      async foo() {},
    });
  }
);