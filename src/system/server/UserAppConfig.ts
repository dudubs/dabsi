import { Consumer } from "../../typedi/Consumer";
import { RpcConfig, RpcError } from "../../typerpc/Rpc";
import { UserApp } from "../common/UserApp";
import { SystemContextResolver } from "./SystemContextResolver";

export const UserAppConfig = Consumer([SystemContextResolver], ({ session }) =>
  RpcConfig(UserApp, $ => {
    if (!session.user) throw new RpcError(`USER_SECURE`);

    return $({
      async foo() {},
    });
  })
);
