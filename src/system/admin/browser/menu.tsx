import { ReactNode } from "react";
import { MuiIcon } from "@dabsi/browser/mui/components/MuiIcon";
import { AnyRouter } from "@dabsi/typerouter/Router";
import { AnyRpc, RpcConnection } from "@dabsi/typerpc/Rpc";

export type MuiAdminMenuProps = {
  connections?: RpcConnection<AnyRpc>;
  title?: ReactNode;
  router?: AnyRouter;
  subRouters?: AnyRouter[];
  children?: Record<string, MuiAdminMenuProps>;
  icon?: MuiIcon;
};

export namespace MuiAdminMenu {
  export const children: Record<string, MuiAdminMenuProps> = {};

  export function register(propsMap: Record<string, MuiAdminMenuProps>) {
    Object.assign(children, propsMap);
  }
}
