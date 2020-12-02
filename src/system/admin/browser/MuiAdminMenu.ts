import { ReactNode } from "react";
import { MuiIcon } from "../../../browser/mui/components/MuiIcon";
import { AnyRouter } from "../../../typerouter/Router";
import { AnyRpc, RpcConnection } from "../../../typerpc/Rpc";

export type MuiAdminMenuProps = {
  connections?: RpcConnection<AnyRpc>;
  title?: ReactNode;
  router?: AnyRouter;
  children?: Record<string, MuiAdminMenuProps>;
  icon?: MuiIcon;
};

export namespace MuiAdminMenu {
  export const children = {} as Record<string, MuiAdminMenuProps>;

  export function register(propsMap: Record<string, MuiAdminMenuProps>) {
    Object.assign(children, propsMap);
  }
}
