import { ReactNode } from "react";
import { MuiIcon } from "../../../browser/mui/components/MuiIcon";
import { AnyRouter } from "../../../typerouter/Router";
import { AnyRpc, RpcConnection } from "../../../typerpc/Rpc";

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
  export const devChildren: Record<string, MuiAdminMenuProps> = {
    main: {
      icon: require("@material-ui/icons/Web"),
    },
    acl: {
      children: {
        users: {
          icon: require("@material-ui/icons/People"),
        },
        groups: {
          icon: require("@material-ui/icons/GroupWork"),
        },
      },
    },
    pages: {
      children: {
        dashboard: {
          icon: require("@material-ui/icons/Dashboard"),
          children: {
            default: {},
            analytics: {},
            saas: { title: "SaaS" },
          },
        },
        pages: {
          icon: require("@material-ui/icons/Pages"),
          children: {
            profile: {},
            settings: {
              children: {
                users: { icon: require("@material-ui/icons/Person") },
                groups: {},
              },
            },
            pricing: {},
            chat: {},
            blankPage: {},
          },
        },
        orders: {
          icon: require("@material-ui/icons/ShoppingCart"),
        },
        invoices: {
          icon: require("@material-ui/icons/Receipt"),
          children: { list: {}, details: {} },
        },
      },
    },
    elements: {
      children: {
        components: {
          icon: require("@material-ui/icons/SettingsInputComposite"),
        },
        charts: {
          icon: require("@material-ui/icons/PieChart"),
        },
      },
    },
  };

  export function register(propsMap: Record<string, MuiAdminMenuProps>) {
    Object.assign(children, propsMap);
  }

  export function register2({}) {}
}
