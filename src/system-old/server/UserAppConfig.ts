import { UserApp } from "@dabsi/system-old/common/UserApp";
import { SystemSession } from "@dabsi/system/session/SystemSession";
import { DataRow } from "@dabsi/typedata/DataRow";
import { RpcError } from "@dabsi/typerpc/Rpc";
import { RpcConfigResolver } from "@dabsi/typerpc/RpcConfigResolver";

export default RpcConfigResolver(
  UserApp,
  {
    session: DataRow(SystemSession),
  },
  c => $ => {
    if (!c.session.user) throw new RpcError(`USER_SECURE`);

    return $({
      async foo() {},
    });
  }
);
