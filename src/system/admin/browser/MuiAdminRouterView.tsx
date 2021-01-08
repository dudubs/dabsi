import React from "react";
import { Emittable } from "@dabsi/react/reactor/Reactor";
import ReactRouterView from "@dabsi/typerouter/ReactRouterView";
import { AdminInfo, AdminRouter } from "@dabsi/system/admin/common";
import { MuiAdminView } from "@dabsi/system/admin/browser/MuiAdminView";

ReactRouterView(AdminRouter, {
  wrap: ({ children }) => {
    return <MuiAdminView>{children}</MuiAdminView>;
  },
});

export const AdminInfoEvent = Emittable<AdminInfo>();
