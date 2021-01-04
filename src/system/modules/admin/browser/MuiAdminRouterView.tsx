import React from "react";
import { Emittable } from "@dabsi/react/reactor/Reactor";
import ReactRouterView from "@dabsi/typerouter/ReactRouterView";
import { AdminInfo, AdminRouter } from "@dabsi/system/modules/admin/common";
import { MuiAdminView } from "@dabsi/system/modules/admin/browser/MuiAdminView";

ReactRouterView(AdminRouter, {
  wrap: ({ children }) => {
    return <MuiAdminView>{children}</MuiAdminView>;
  },
});

export const AdminInfoEvent = Emittable<AdminInfo>();

console.log("xasdaasdsdx");
